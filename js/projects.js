(function(){
  'use strict';

  var dialog = document.querySelector('.project-dialog');
  var title = dialog.querySelector('#dialog-title');
  var meta = dialog.querySelector('.dialog-meta');
  var description = dialog.querySelector('.dialog-description');
  var role = dialog.querySelector('.dialog-role');
  var sourceLink = dialog.querySelector('.dialog-source');
  var sourceUnavailable = dialog.querySelector('.dialog-source-unavailable');
  var image = dialog.querySelector('.dialog-image');
  var video = dialog.querySelector('.dialog-video');
  var imagePlaceholder = dialog.querySelector('.dialog-art-placeholder');
  var closeButton = dialog.querySelector('.dialog-close');
  var renderToggle = dialog.querySelector('.dialog-view-toggle');
  var renderButtons = Array.prototype.slice.call(dialog.querySelectorAll('[data-render-view]'));
  var activeProject = null;
  var activeFinalVideo = '';
  var activeViewportVideo = '';
  var pageScrollY = 0;
  var previousHtmlOverflow = '';
  var previousBody = {};
  var galleryProjects = Array.prototype.slice.call(document.querySelectorAll('.gallery-card'));
  var listProjects = Array.prototype.slice.call(document.querySelectorAll('.project-row'));
  var projectCount = galleryProjects.length;
  var filterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter-option'));
  var projectTotal = document.querySelector('[data-project-total]');
  var filterResult = document.querySelector('.filter-result');
  var previewVideos = Array.prototype.slice.call(document.querySelectorAll('.gallery-video'));

  function normalizedCategory(project){
    return project.dataset.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function matchesFilter(project, filter){
    return filter === 'all' ||
      (filter === 'upcoming' && project.dataset.status === 'upcoming') ||
      normalizedCategory(project) === filter;
  }

  function updateFilter(filter){
    var visibleCount = 0;
    filterOptions.forEach(function(option){
      var isActive = option.dataset.filter === filter;
      option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    galleryProjects.concat(listProjects).forEach(function(project){
      var isVisible = matchesFilter(project, filter);
      project.hidden = !isVisible;
      if(project.classList.contains('gallery-card') && isVisible) visibleCount++;
    });

    filterResult.textContent = 'Showing ' + visibleCount + (visibleCount === 1 ? ' project' : ' projects');
  }

  function setRenderView(view){
    var source = view === 'viewport' ? activeViewportVideo : activeFinalVideo;
    if(!source) return;
    renderButtons.forEach(function(button){
      button.setAttribute('aria-pressed', button.dataset.renderView === view ? 'true' : 'false');
    });
    video.src = source;
    video.hidden = false;
    video.load();
    video.play().catch(function(){});
  }

  function playVisiblePreviews(){
    previewVideos.forEach(function(preview){
      if(preview.offsetParent !== null && !preview.closest('[hidden]')){
        preview.play().catch(function(){});
      }
    });
  }

  filterOptions.forEach(function(option){
    option.addEventListener('click', function(){
      updateFilter(option.dataset.filter);
    });
  });

  projectTotal.textContent = String(projectCount).padStart(2, '0');
  document.querySelectorAll('[data-filter-count]').forEach(function(count){
    var filter = count.dataset.filterCount;
    count.textContent = String(galleryProjects.filter(function(project){
      return matchesFilter(project, filter);
    }).length).padStart(2, '0');
  });

  // Only play gallery previews while they are on screen.
  if('IntersectionObserver' in window){
    var previewObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !dialog.open){
          entry.target.play().catch(function(){});
        }else{
          entry.target.pause();
        }
      });
    }, { rootMargin:'200px' });
    previewVideos.forEach(function(preview){
      previewObserver.observe(preview);
    });
  }else{
    playVisiblePreviews();
  }

  renderButtons.forEach(function(button){
    button.addEventListener('click', function(){
      setRenderView(button.dataset.renderView);
    });
  });

  galleryProjects.concat(listProjects).forEach(function(project){
    project.addEventListener('click', function(){
      activeProject = project;
      title.textContent = project.dataset.title;
      meta.textContent = project.dataset.category + ' · ' + project.dataset.year + ' · ' + project.dataset.status;
      description.textContent = project.dataset.description;
      role.textContent = project.dataset.role;
      var source = project.dataset.source.trim();
      if(source){
        var sourceUrl = new URL(source, window.location.href);
        if(sourceUrl.protocol !== 'http:' && sourceUrl.protocol !== 'https:'){
          throw new Error('Project source URLs must use HTTP or HTTPS.');
        }
        sourceLink.href = sourceUrl.href;
        sourceLink.hidden = false;
        sourceUnavailable.hidden = true;
      }else{
        sourceLink.removeAttribute('href');
        sourceLink.hidden = true;
        sourceUnavailable.hidden = false;
      }

      activeFinalVideo = (project.dataset.video || '').trim();
      activeViewportVideo = (project.dataset.videoViewport || '').trim();

      if(activeFinalVideo){
        image.removeAttribute('src');
        image.alt = '';
        image.hidden = true;
        renderToggle.hidden = !activeViewportVideo;
        renderButtons.forEach(function(button){
          button.setAttribute('aria-pressed', button.dataset.renderView === 'final' ? 'true' : 'false');
        });
        video.src = activeFinalVideo;
        video.hidden = false;
        video.load();
        video.play().catch(function(){});
        imagePlaceholder.hidden = true;
      }else if(project.dataset.image){
        renderToggle.hidden = true;
        activeViewportVideo = '';
        video.pause();
        video.removeAttribute('src');
        video.hidden = true;
        image.src = project.dataset.image;
        image.alt = project.dataset.title + ' artwork';
        image.hidden = false;
        imagePlaceholder.hidden = true;
      }else{
        renderToggle.hidden = true;
        activeViewportVideo = '';
        video.pause();
        video.removeAttribute('src');
        video.hidden = true;
        image.removeAttribute('src');
        image.alt = '';
        image.hidden = true;
        imagePlaceholder.hidden = false;
      }

      previewVideos.forEach(function(preview){
        preview.pause();
      });

      pageScrollY = window.scrollY;
      previousHtmlOverflow = document.documentElement.style.overflow;
      previousBody = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width
      };
      document.documentElement.classList.add('project-dialog-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = -pageScrollY + 'px';
      document.body.style.width = '100%';
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', function(){
    dialog.close();
  });

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && dialog.open){
      event.preventDefault();
      dialog.close();
    }
  });

  dialog.addEventListener('close', function(){
    video.pause();
    document.documentElement.classList.remove('project-dialog-open');
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBody.overflow || '';
    document.body.style.position = previousBody.position || '';
    document.body.style.top = previousBody.top || '';
    document.body.style.width = previousBody.width || '';
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, pageScrollY);
    document.documentElement.style.scrollBehavior = '';
    playVisiblePreviews();
    if(activeProject) activeProject.focus({ preventScroll:true });
  });

  dialog.addEventListener('click', function(event){
    if(event.target === dialog) dialog.close();
  });

  document.querySelectorAll('.view-option').forEach(function(option){
    option.addEventListener('click', function(){
      var view = option.dataset.view;
      document.body.dataset.view = view;
      document.querySelectorAll('.view-option').forEach(function(item){
        item.setAttribute('aria-pressed', item === option ? 'true' : 'false');
      });
      playVisiblePreviews();
    });
  });
})();
