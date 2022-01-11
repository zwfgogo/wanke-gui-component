/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
var mxClient =
  {
    /**
     * Class: mxClient
     *
     * Bootstrapping mechanism for the mxGraph thin client. The production version
     * of this file contains all code required to run the mxGraph thin client, as
     * well as global constants to identify the browser and operating system in
     * use. You may have to load chrome://global/content/contentAreaUtils.js in
     * your page to disable certain security restrictions in Mozilla.
     *
     * Variable: VERSION
     *
     * Contains the current version of the mxGraph library. The strings that
     * communicate versions of mxGraph use the following format.
     *
     * versionMajor.versionMinor.buildNumber.revisionNumber
     *
     * Current version is 4.0.2.
     */
    VERSION: '4.1.1',

    /**
     * Variable: IS_IE
     *
     * True if the current browser is Internet Explorer 10 or below. Use <mxClient.IS_IE11>
     * to detect IE 11.
     */
    IS_IE: navigator.userAgent.indexOf('MSIE') >= 0,

    /**
     * Variable: IS_IE6
     *
     * True if the current browser is Internet Explorer 6.x.
     */
    IS_IE6: navigator.userAgent.indexOf('MSIE 6') >= 0,

    /**
     * Variable: IS_IE11
     *
     * True if the current browser is Internet Explorer 11.x.
     */
    IS_IE11: !!navigator.userAgent.match(/Trident\/7\./),

    /**
     * Variable: IS_EDGE
     *
     * True if the current browser is Microsoft Edge.
     */
    IS_EDGE: !!navigator.userAgent.match(/Edge\//),

    /**
     * Variable: IS_QUIRKS
     *
     * True if the current browser is Internet Explorer and it is in quirks mode.
     */
    IS_QUIRKS: navigator.userAgent.indexOf('MSIE') >= 0 && (document.documentMode == null || document.documentMode == 5),

    /**
     * Variable: IS_EM
     *
     * True if the browser is IE11 in enterprise mode (IE8 standards mode).
     */
    IS_EM: 'spellcheck' in document.createElement('textarea') && document.documentMode == 8,

    /**
     * Variable: VML_PREFIX
     *
     * Prefix for VML namespace in node names. Default is 'v'.
     */
    VML_PREFIX: 'v',

    /**
     * Variable: OFFICE_PREFIX
     *
     * Prefix for VML office namespace in node names. Default is 'o'.
     */
    OFFICE_PREFIX: 'o',

    /**
     * Variable: IS_NS
     *
     * True if the current browser is Netscape (including Firefox).
     */
    IS_NS: navigator.userAgent.indexOf('Mozilla/') >= 0 &&
      navigator.userAgent.indexOf('MSIE') < 0 &&
      navigator.userAgent.indexOf('Edge/') < 0,

    /**
     * Variable: IS_OP
     *
     * True if the current browser is Opera.
     */
    IS_OP: navigator.userAgent.indexOf('Opera/') >= 0 ||
      navigator.userAgent.indexOf('OPR/') >= 0,

    /**
     * Variable: IS_OT
     *
     * True if -o-transform is available as a CSS style, ie for Opera browsers
     * based on a Presto engine with version 2.5 or later.
     */
    IS_OT: navigator.userAgent.indexOf('Presto/') >= 0 &&
      navigator.userAgent.indexOf('Presto/2.4.') < 0 &&
      navigator.userAgent.indexOf('Presto/2.3.') < 0 &&
      navigator.userAgent.indexOf('Presto/2.2.') < 0 &&
      navigator.userAgent.indexOf('Presto/2.1.') < 0 &&
      navigator.userAgent.indexOf('Presto/2.0.') < 0 &&
      navigator.userAgent.indexOf('Presto/1.') < 0,

    /**
     * Variable: IS_SF
     *
     * True if the current browser is Safari.
     */
    IS_SF: navigator.userAgent.indexOf('AppleWebKit/') >= 0 &&
      navigator.userAgent.indexOf('Chrome/') < 0 &&
      navigator.userAgent.indexOf('Edge/') < 0,

    /**
     * Variable: IS_IOS
     *
     * Returns true if the user agent is an iPad, iPhone or iPod.
     */
    IS_IOS: (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),

    /**
     * Variable: IS_GC
     *
     * True if the current browser is Google Chrome.
     */
    IS_GC: navigator.userAgent.indexOf('Chrome/') >= 0 &&
      navigator.userAgent.indexOf('Edge/') < 0,

    /**
     * Variable: IS_CHROMEAPP
     *
     * True if the this is running inside a Chrome App.
     */
    IS_CHROMEAPP: window.chrome != null && chrome.app != null && chrome.app.runtime != null,

    /**
     * Variable: IS_FF
     *
     * True if the current browser is Firefox.
     */
    IS_FF: navigator.userAgent.indexOf('Firefox/') >= 0,

    /**
     * Variable: IS_MT
     *
     * True if -moz-transform is available as a CSS style. This is the case
     * for all Firefox-based browsers newer than or equal 3, such as Camino,
     * Iceweasel, Seamonkey and Iceape.
     */
    IS_MT: (navigator.userAgent.indexOf('Firefox/') >= 0 &&
      navigator.userAgent.indexOf('Firefox/1.') < 0 &&
      navigator.userAgent.indexOf('Firefox/2.') < 0) ||
      (navigator.userAgent.indexOf('Iceweasel/') >= 0 &&
        navigator.userAgent.indexOf('Iceweasel/1.') < 0 &&
        navigator.userAgent.indexOf('Iceweasel/2.') < 0) ||
      (navigator.userAgent.indexOf('SeaMonkey/') >= 0 &&
        navigator.userAgent.indexOf('SeaMonkey/1.') < 0) ||
      (navigator.userAgent.indexOf('Iceape/') >= 0 &&
        navigator.userAgent.indexOf('Iceape/1.') < 0),

    /**
     * Variable: IS_VML
     *
     * True if the browser supports VML.
     */
    IS_VML: navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER',

    /**
     * Variable: IS_SVG
     *
     * True if the browser supports SVG.
     */
    IS_SVG: navigator.appName.toUpperCase() != 'MICROSOFT INTERNET EXPLORER',

    /**
     * Variable: NO_FO
     *
     * True if foreignObject support is not available. This is the case for
     * Opera, older SVG-based browsers and all versions of IE.
     */
    NO_FO: !document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg',
      'foreignObject') != '[object SVGForeignObjectElement]' || navigator.userAgent.indexOf('Opera/') >= 0,

    /**
     * Variable: IS_WIN
     *
     * True if the client is a Windows.
     */
    IS_WIN: navigator.appVersion.indexOf('Win') > 0,

    /**
     * Variable: IS_MAC
     *
     * True if the client is a Mac.
     */
    IS_MAC: navigator.appVersion.indexOf('Mac') > 0,

    /**
     * Variable: IS_TOUCH
     *
     * True if this device supports touchstart/-move/-end events (Apple iOS,
     * Android, Chromebook and Chrome Browser on touch-enabled devices).
     */
    IS_TOUCH: 'ontouchstart' in document.documentElement,

    /**
     * Variable: IS_POINTER
     *
     * True if this device supports Microsoft pointer events (always false on Macs).
     */
    IS_POINTER: window.PointerEvent != null && !(navigator.appVersion.indexOf('Mac') > 0),

    /**
     * Variable: IS_LOCAL
     *
     * True if the documents location does not start with http:// or https://.
     */
    IS_LOCAL: document.location.href.indexOf('http://') < 0 &&
      document.location.href.indexOf('https://') < 0,

    /**
     * Variable: defaultBundles
     *
     * Contains the base names of the default bundles if mxLoadResources is false.
     */
    defaultBundles: [],

    /**
     * Function: isBrowserSupported
     *
     * Returns true if the current browser is supported, that is, if
     * <mxClient.IS_VML> or <mxClient.IS_SVG> is true.
     *
     * Example:
     *
     * (code)
     * if (!mxClient.isBrowserSupported())
     * {
     *   mxUtils.error('Browser is not supported!', 200, false);
     * }
     * (end)
     */
    isBrowserSupported: function () {
      return mxClient.IS_VML || mxClient.IS_SVG
    },

    /**
     * Function: link
     *
     * Adds a link node to the head of the document. Use this
     * to add a stylesheet to the page as follows:
     *
     * (code)
     * mxClient.link('stylesheet', filename);
     * (end)
     *
     * where filename is the (relative) URL of the stylesheet. The charset
     * is hardcoded to ISO-8859-1 and the type is text/css.
     *
     * Parameters:
     *
     * rel - String that represents the rel attribute of the link node.
     * href - String that represents the href attribute of the link node.
     * doc - Optional parent document of the link node.
     * id - unique id for the link element to check if it already exists
     */
    link: function (rel, href, doc, id) {
      doc = doc || document

      // Workaround for Operation Aborted in IE6 if base tag is used in head
      if (mxClient.IS_IE6) {
        doc.write('<link rel="' + rel + '" href="' + href + '" charset="UTF-8" type="text/css"/>')
      } else {
        var link = doc.createElement('link')

        link.setAttribute('rel', rel)
        link.setAttribute('href', href)
        link.setAttribute('charset', 'UTF-8')
        link.setAttribute('type', 'text/css')

        if (id) {
          link.setAttribute('id', id)
        }

        var head = doc.getElementsByTagName('head')[0]
        head.appendChild(link)
      }
    },


    /**
     * Function: include
     *
     * Dynamically adds a script node to the document header.
     *
     * In production environments, the includes are resolved in the mxClient.js
     * file to reduce the number of requests required for client startup. This
     * function should only be used in development environments, but not in
     * production systems.
     */
    include: function (src) {
      document.write('<script src="' + src + '"></script>')
    }
  }

/**
 * Variable: mxLoadResources
 *
 * Optional global config variable to toggle loading of the two resource files
 * in <mxGraph> and <mxEditor>. Default is true. NOTE: This is a global variable,
 * not a variable of mxClient. If this is false, you can use <mxClient.loadResources>
 * with its callback to load the default bundles asynchronously.
 *
 * (code)
 * <script type="text/javascript">
 *    var mxLoadResources = false;
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 */
if (typeof (window.mxLoadResources) == 'undefined') {
  window.mxLoadResources = true
}

/**
 * Variable: mxForceIncludes
 *
 * Optional global config variable to force loading the JavaScript files in
 * development mode. Default is undefined. NOTE: This is a global variable,
 * not a variable of mxClient.
 *
 * (code)
 * <script type="text/javascript">
 *    var mxLoadResources = true;
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 */
if (typeof (window.mxForceIncludes) == 'undefined') {
  window.mxForceIncludes = false
}

/**
 * Variable: mxResourceExtension
 *
 * Optional global config variable to specify the extension of resource files.
 * Default is true. NOTE: This is a global variable, not a variable of mxClient.
 *
 * (code)
 * <script type="text/javascript">
 *    var mxResourceExtension = '.txt';
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 */
if (typeof (window.mxResourceExtension) == 'undefined') {
  window.mxResourceExtension = '.txt'
}

/**
 * Variable: mxLoadStylesheets
 *
 * Optional global config variable to toggle loading of the CSS files when
 * the library is initialized. Default is true. NOTE: This is a global variable,
 * not a variable of mxClient.
 *
 * (code)
 * <script type="text/javascript">
 *    var mxLoadStylesheets = false;
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 */
if (typeof (window.mxLoadStylesheets) == 'undefined') {
  window.mxLoadStylesheets = true
}

/**
 * Variable: basePath
 *
 * Basepath for all URLs in the core without trailing slash. Default is '.'.
 * Set mxBasePath prior to loading the mxClient library as follows to override
 * this setting:
 *
 * (code)
 * <script type="text/javascript">
 *    mxBasePath = '/path/to/core/directory';
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 *
 * When using a relative path, the path is relative to the URL of the page that
 * contains the assignment. Trailing slashes are automatically removed.
 */
if (typeof (mxBasePath) != 'undefined' && mxBasePath.length > 0) {
  // Adds a trailing slash if required
  if (mxBasePath.substring(mxBasePath.length - 1) == '/') {
    mxBasePath = mxBasePath.substring(0, mxBasePath.length - 1)
  }

  mxClient.basePath = mxBasePath
} else {
  mxClient.basePath = '.'
}

/**
 * Variable: imageBasePath
 *
 * Basepath for all images URLs in the core without trailing slash. Default is
 * <mxClient.basePath> + '/images'. Set mxImageBasePath prior to loading the
 * mxClient library as follows to override this setting:
 *
 * (code)
 * <script type="text/javascript">
 *    mxImageBasePath = '/path/to/image/directory';
 * </script>
 * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
 * (end)
 *
 * When using a relative path, the path is relative to the URL of the page that
 * contains the assignment. Trailing slashes are automatically removed.
 */
if (typeof (mxImageBasePath) != 'undefined' && mxImageBasePath.length > 0) {
  // Adds a trailing slash if required
  if (mxImageBasePath.substring(mxImageBasePath.length - 1) == '/') {
    mxImageBasePath = mxImageBasePath.substring(0, mxImageBasePath.length - 1)
  }

  mxClient.imageBasePath = mxImageBasePath
} else {
  mxClient.imageBasePath = mxClient.basePath + '/images'
}

/**
 * Variable: language
 *
 * Defines the language of the client, eg. en for english, de for german etc.
 * The special value 'none' will disable all built-in internationalization and
 * resource loading. See <mxResources.getSpecialBundle> for handling identifiers
 * with and without a dash.
 *
 * Set mxLanguage prior to loading the mxClient library as follows to override
 * this setting:
 *
 * (code)
 * <script type="text/javascript">
 *    mxLanguage = 'en';
 * </script>
 * <script type="text/javascript" src="js/mxClient.js"></script>
 * (end)
 *
 * If internationalization is disabled, then the following variables should be
 * overridden to reflect the current language of the system. These variables are
 * cleared when i18n is disabled.
 * <mxEditor.askZoomResource>, <mxEditor.lastSavedResource>,
 * <mxEditor.currentFileResource>, <mxEditor.propertiesResource>,
 * <mxEditor.tasksResource>, <mxEditor.helpResource>, <mxEditor.outlineResource>,
 * <mxElbowEdgeHandler.doubleClickOrientationResource>, <mxUtils.errorResource>,
 * <mxUtils.closeResource>, <mxGraphSelectionModel.doneResource>,
 * <mxGraphSelectionModel.updatingSelectionResource>, <mxGraphView.doneResource>,
 * <mxGraphView.updatingDocumentResource>, <mxCellRenderer.collapseExpandResource>,
 * <mxGraph.containsValidationErrorsResource> and
 * <mxGraph.alreadyConnectedResource>.
 */
if (typeof (mxLanguage) != 'undefined' && mxLanguage != null) {
  mxClient.language = mxLanguage
} else {
  mxClient.language = (mxClient.IS_IE) ? navigator.userLanguage : navigator.language
}

/**
 * Variable: defaultLanguage
 *
 * Defines the default language which is used in the common resource files. Any
 * resources for this language will only load the common resource file, but not
 * the language-specific resource file. Default is 'en'.
 *
 * Set mxDefaultLanguage prior to loading the mxClient library as follows to override
 * this setting:
 *
 * (code)
 * <script type="text/javascript">
 *    mxDefaultLanguage = 'de';
 * </script>
 * <script type="text/javascript" src="js/mxClient.js"></script>
 * (end)
 */
if (typeof (mxDefaultLanguage) != 'undefined' && mxDefaultLanguage != null) {
  mxClient.defaultLanguage = mxDefaultLanguage
} else {
  mxClient.defaultLanguage = 'en'
}

// Adds all required stylesheets and namespaces
// if (mxLoadStylesheets)
// {
// 	mxClient.link('stylesheet', mxClient.basePath + '/css/common.css');
// }

/**
 * Variable: languages
 *
 * Defines the optional array of all supported language extensions. The default
 * language does not have to be part of this list. See
 * <mxResources.isLanguageSupported>.
 *
 * (code)
 * <script type="text/javascript">
 *    mxLanguages = ['de', 'it', 'fr'];
 * </script>
 * <script type="text/javascript" src="js/mxClient.js"></script>
 * (end)
 *
 * This is used to avoid unnecessary requests to language files, ie. if a 404
 * will be returned.
 */
if (typeof (mxLanguages) != 'undefined' && mxLanguages != null) {
  mxClient.languages = mxLanguages
}

export default mxClient