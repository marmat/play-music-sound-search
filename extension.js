(function() {
  'use strict';

  var AUTO_PLAYLIST_CONTAINER_ID = 'auto-playlists';

  function onDomMutation(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.id == AUTO_PLAYLIST_CONTAINER_ID) {
        addSoundSearchLink(mutation.target);
      }

      if (!!mutation.addedNodes) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          if (mutation.addedNodes[i].id == AUTO_PLAYLIST_CONTAINER_ID) {
            addSoundSearchLink(mutation.addedNodes[i]);
          }
        }
      }
    });
  }

  function addSoundSearchLink(container) {
    if (!container || !!document.querySelector('auto-playlist-sound-search')) {
      console.log('Tried to add SoundSearch Link to invalid container');
      return;
    }

    var soundSearch = document.createElement('a');
    soundSearch.id = 'auto-playlist-sound-search';
    soundSearch.href = '';
    soundSearch.className = 'nav-item-container';
    soundSearch.setAttribute('data-type', 'ap');
    soundSearch.setAttribute('data-id', 'sound-search');

    var soundSearchContent = document.createElement('div');
    soundSearchContent.className = 'tootltip fade-out';
    soundSearchContent.innerHTML = 'Sound Search';

    soundSearch.appendChild(soundSearchContent);
    container.appendChild(soundSearch);
    mutationObserver.disconnect();
  }

  var mutationObserver = new MutationObserver(onDomMutation);
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
