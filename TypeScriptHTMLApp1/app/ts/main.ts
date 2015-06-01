'use strict';
(function () {
    MyApp.Module.start({
        apiPath: '/app/templates'
        , directoryList: 'Sites-Directory'
        , requestsList: 'Site-Creation-Requests'
        , widgetSelector: '#sitesRequrests-App'
        , defaultViewSettings: { key: '', filter: '' }
    });
})();