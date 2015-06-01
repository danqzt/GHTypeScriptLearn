
(function () {

    var appPath = kGlobals.utils.getScriptPath('siteRequests-appInit.js');
    var weburl = _spPageContextInfo.siteAbsoluteUrl;
    var scriptElement = kGlobals.utils.getScriptElement('siteRequests-appInit.js');
   
    var widgetSelector = '#sitesRequrests-App';
    document.writeln('<div id="' + widgetSelector.substr(1) + '" ></div>');
    document.writeln('<link rel="stylesheet" href="' + (appPath + '/Styles.css') + '"> ');

    var executeModule = function ($,app) {

        var s = $(scriptElement);
        var viewKey = s.attr('data-viewKey')
        var viewFilter = s.attr('data-viewFilter')

        app.start({
            apiPath: weburl
            , directoryList: 'Sites-Directory'
            , requestsList: 'Site-Creation-Requests'
            , widgetSelector: widgetSelector
            , defaultViewSettings: { key: viewKey, filter: viewFilter }
        });
    }
   
    kGlobals.require(['jquery', appPath + '/siteRequestsModule.js?v=01'], executeModule);
})();

