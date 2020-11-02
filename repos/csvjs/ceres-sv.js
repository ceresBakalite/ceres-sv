/**
 * @license
 * ceres-sv v1.0.0
 *
 * Minified using terser v5.3.5
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-sv.js
 *
 * ceresBakalite/ceres-sv is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2020 Alexander Munro
*/

/*
export { ceres };

import { resource as rsc, caching } from './ceres-sv-lib.min.js';
//import { resource as rsc, caching } from 'https://ceresbakalite.github.io/ceres-sv/repos/csvjs/ceres-sv-lib.js';

var ceres = {};
(function()
{
    'use strict';

    const config = new class { constructor() {} } // ceres slideview configuration attributes
    const csv = 'ceres-sv'; // required ceres slideview element name
    const cls = new Map();

    const setSlide = function (el)
    {
        cls.set('left', config.slide - 1);
        cls.set('right', config.slide + 1);
        cls.set('nub', Number.parseInt(el.id.replace('nub', ''), 10));

        config.slide = cls.get(el.className);
    }

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(el) { config.bindSlide.call(setSlide(el)); };  // global scope method reference

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
*/
const csv = 'ceres-sv'; // required ceres slideview element name
const config = new class { constructor() {} } // ceres slideview configuration attributes

window,
document,
window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
{
    'use strict';

    //const csv = 'ceres-sv'; // required ceres slideview element name
    const cls = new Map();

    const slideIndex = function (el)
    {
        cls.set('left', config.slide - 1);
        cls.set('right', config.slide + 1);
        cls.set('nub', Number.parseInt(el.id.replace('nub', ''), 10));

        config.slide = cls.get(el.className);
    }

    getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    getSlide = function(el) { setSlide(slideIndex(el)); };  // global scope method reference

        async connectedCallback()
        {
            const cnv = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
            const csr = function() { return attribute; } // ceres slideview resource attributes

            if (!Object.isFrozen(csr)) getResources();

            let css = this.getAttribute('css') || config.defaultCSS;
            let src = this.getAttribute('src') || null;

            config.progenitor = this;
            config.fetchcss = !rsc.isEmptyOrNull(css);
            config.callback = !rsc.isEmptyOrNull(src);

            config.slide = 1;

            //if (config.fetchcss) await ( await fetchStylesheets(css) );
            if (config.callback) this.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            config.cache.src = config.cache.src.concat(src);

            if (slideviewHasAttributes()) activateSlideView();

            let precursor = function() { return config.callback || config.noscript; }

            let protean = function()
            {
                const exists = !rsc.isEmptyOrNull(config.progenitor);

                if (exists)
                {
                    config.progenitor.id = rsc.getUniqueElementId(csv);
                    config.noscript = document.getElementById(cnv) || document.getElementsByTagName('noscript')[0];

                    config.attributes.sur = rsc.getBooleanAttribute(config.progenitor.getAttribute('sur')); // disabled
                    config.attributes.sub = rsc.getBooleanAttribute(config.progenitor.getAttribute('sub')); // disabled
                    config.attributes.trace = rsc.getBooleanAttribute(config.progenitor.getAttribute('trace')); // disabled
                    config.attributes.delay = Number.isInteger(parseInt(config.progenitor.getAttribute('delay'))) ? parseInt(config.progenitor.getAttribute('delay')) : 250;
                    config.attributes.cache = !rsc.getBooleanAttribute(config.progenitor.getAttribute('cache')); // enabled
                    config.attributes.nub = !rsc.getBooleanAttribute(config.progenitor.getAttribute('nub')); // enabled
                }

                return exists;
            }

            let attributesExist = function()
            {
                config.imageArray = null;

                rsc.inspect({ type: rsc.constant.notify, notification: csr.configAttributes + rsc.getObjectProperties(config.attributes), logtrace: config.attributes.trace });

                const getImageList = function()
                {
                    let getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(config.progenitor.textContent)) ? config.progenitor.textContent : null; }

                    let getBodyContentList = function()
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.noscriptSearch, logtrace: config.attributes.trace });

                        const list = !rsc.isEmptyOrNull(config.noscript) ? config.noscript.textContent : null;
                        return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.noscriptError, logtrace: config.attributes.trace });
                    }

                    return config.callback ? getConnectedCallbackList() : getBodyContentList();
                }

                const isImageArray = function()
                {
                    let imageList = getImageList();

                    if (!rsc.isEmptyOrNull(imageList))
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.imageMarkup + ' [' + (config.callback ? csv + ' - callback' : cnv + ' - noscript') + ']:' + rsc.constant.newline + imageList, logtrace: config.attributes.trace });
                        config.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                    }

                    if (!Object.isSealed(config)) Object.seal(config);

                    return !rsc.isEmptyOrNull(config.imageArray);
                }

                return isImageArray();
            }

            function getResources()
            {
                csr.imageMarkup = 'Image list markup';
                csr.configAttributes = 'The ' + csv + ' element attributes after initialisation: ';
                csr.noscriptSearch = 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback noscript element in the document body';
                csr.progenitorError = 'Error: Unable to find the ' + csv + ' document element';
                csr.imageListError = 'Error: Unable to find either the callback ' + csv + ' nor the fallback noscript ' + cnv + ' elements';
                csr.noscriptError = 'Error: Unable to find the ' + cnv + ' fallback noscript element when searching the document body';

                Object.freeze(csr);

                config.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                config.attributes = function() { return attribute; }
                config.cache = function() { return attribute; }
                config.cache.css = [];
                config.cache.src = [];
                //config.bindSlide = setSlide.bind(ceres);
            }

            function slideviewHasAttributes()
            {
                if (!protean()) return rsc.inspect({ type: rsc.constant.error, notification: csr.progenitorError, logtrace: config.attributes.trace });
                if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.imageListError, logtrace: config.attributes.trace });

                return attributesExist();
            }

            function getSlideView()
            {
                let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                let getSurtitle = function() { return (config.attributes.sur) ? imageIndex + ' / ' + config.imageArray.length : null; }
                let getSubtitle = function() { return (config.attributes.sub) ? getAccessibilityText() : null; }
                let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

                rsc.clearElement(config.progenitor);

                config.progenitor.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

                const styleContainer = document.createElement('style');
                styleContainer.id = csv + '-style';
                styleContainer.className = 'slideview-style';

                config.progenitor.appendChild(styleContainer);

                fetch(config.defaultCSS).then(response => response.text()).then(str =>
                {
                    styleContainer.insertAdjacentHTML('afterbegin', str)
                });

                const bodyContainer = document.createElement('div');
                bodyContainer.id = csv + '-body';
                bodyContainer.className = 'slideview-body';
                bodyContainer.style.display  = 'none';

                config.progenitor.appendChild(bodyContainer);

                const imageContainer = document.createElement('div');
                imageContainer.id = csv + '-image';
                imageContainer.className = 'slideview-image';

                bodyContainer.appendChild(imageContainer);

                for (let item = 0; item < config.imageArray.length; item++)
                {
                    var arrayItem = config.imageArray[item].split(',');
                    var imageIndex = item + 1;

                    let id = csv + imageIndex;

                    let elements = {
                        'surName': csv + '-sur' + imageIndex,
                        'imgName': csv + '-img' + imageIndex,
                        'subName': csv + '-sub' + imageIndex
                    };

                    let slideContainer = document.createElement('div');
                    slideContainer.className = 'view fade';

                    imageContainer.appendChild(slideContainer);

                    if (config.attributes.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                    rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
                    if (config.attributes.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                }

                rsc.composeElement({ el: 'a', id: csv + '-left', classValue: 'left', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(this)' });
                rsc.composeElement({ el: 'a', id: csv + '-right', classValue: 'right', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(this)' });

                if (config.attributes.nub) getSlideViewTrackContainer();

                rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image' }, getHorizontalSwipe, { left: -1, right: 1 } );

                config.progenitor.shadowRoot.append(styleContainer);
                config.progenitor.shadowRoot.append(bodyContainer);

                function getHorizontalSwipe(swipe)
                {
                    const offset = (swipe.action) ? swipe.right : swipe.left;
                    setSlide(config.slide = config.slide += offset);
                }

                rsc.inspect({ type: rsc.constant.notify, notification: config.progenitor, logtrace: config.attributes.trace });

                function getSlideViewTrackContainer()
                {
                    const getClickEvent = function() { return 'window.getSlide(this)'; }

                    const trackContainer = document.createElement('div');
                    trackContainer.id = csv + '-nub';
                    trackContainer.className = 'slideview-nub';

                    bodyContainer.appendChild(trackContainer);

                    for (let item = 0; item < config.imageArray.length; item++)
                    {
                        var index = item + 1;
                        rsc.composeElement({ el: 'span', id: 'nub' + index, classValue: 'nub', parent: trackContainer, onClickEvent: getClickEvent() });
                    }

                    bodyContainer.appendChild(document.createElement('br'));
                }

            }

            function fetchStylesheets(str)
            {
                const css = str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';');

                const setlink = function(url, index)
                {
                    if (!config.cache.css.includes(url)) rsc.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: url, media: 'screen' });
                }

                if (!rsc.isEmptyOrNull(css)) css.forEach(setlink);

                config.cache.css = config.cache.css.concat(css);
            }

            function setSlide()
            {
                const shadow = config.progenitor.shadowRoot;
                const slides = shadow.querySelectorAll('div.view');

                const setNubStyle = function()
                {
                    const elements = shadow.querySelectorAll('span.nub');
                    const el = shadow.querySelector('span.enabled');

                    if (el) el.className = 'nub';
                    elements[config.slide-1].className += ' enabled';
                }

                config.slide = (config.slide < 1) ? slides.length : (config.slide > slides.length) ? 1 : config.slide;

                slides.forEach(node => { node.style.display = 'none'; } );
                slides[config.slide-1].style.display = 'block';

                if (config.attributes.nub) setNubStyle();
            }

            function activateSlideView()
            {
                config.progenitor.style.display = 'none';

                getSlideView();
                setSlide();

                setTimeout(function() { setSlideViewDisplay('block'); }, config.attributes.delay);

                if (config.attributes.cache) setCache();
            }


            function setSlideViewDisplay(attribute)
            {
                config.progenitor.style.display = 'block';

                const shadow = config.progenitor.shadowRoot;
                const nodelist = shadow.querySelectorAll('div.slideview-body, img.slide, #' + config.progenitor.id);

                nodelist.forEach(node => { node.style.display = attribute; } );
            }

            function setCache()
            {
                const cacheName = csv + '-cache';
                config.cache.script = [ import.meta.url, rsc.getImportMetaUrl() ];

                if (caching.available) caching.installCache(cacheName, rsc.removeDuplcates(config.cache.css.concat(config.cache.src.concat(config.cache.script))));
            }

            var rsc = {};
            (function()
            {
                'use strict';

                const protean = function() { return attribute; }
                const resource = function() { return attribute; }
                const symbol = new Map();

                setPrecursors();

                this.constant = protean; // exposed local scope attributes

                Object.freeze(this.constant);

                this.windowOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
                this.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
                this.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }
                this.getImportMetaUrl = function() { return import.meta.url; }

                this.setHorizontalSwipe = function(touch, callback, args)
                {
                    const el = document.querySelector(touch.el);

                    if (!touch.act) touch.act = 10;

                    el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true } );

                    el.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: true });

                    el.addEventListener('touchend', e =>
                    {
                        touch.end = e.changedTouches[0].screenX;

                        if (Math.abs(touch.start - touch.end) > touch.act)
                        {
                            args.action = (touch.start > touch.end);
                            callback.call(this, args);
                        }

                    }, { passive: true });

                }

                this.composeElement = function(element)
                {
                    const el = document.createElement(element.el);

                    el.id = element.id;
                    element.parent.appendChild(el);

                    if (element.classValue) this.composeAttribute({ id: el.id, type: 'class', value: element.classValue });
                    if (element.onClickEvent) this.composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEvent });
                    if (element.csv) this.composeAttribute({ id: el.id, type: 'csv', value: element.csv });
                    if (element.url) this.composeAttribute({ id: el.id, type: 'src', value: element.url });
                    if (element.accessibility) this.composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
                    if (element.markup) document.getElementById(el.id).insertAdjacentHTML('afterbegin', element.markup);
                }

                this.composeAttribute = function(attribute)
                {
                    const el = document.getElementById(attribute.id);

                    if (el)
                    {
                        const attributeNode = document.createAttribute(attribute.type);
                        attributeNode.value = attribute.value;

                        el.setAttributeNode(attributeNode);
                    }

                }

                this.composeLinkElement = function(attribute)
                {
                    const link = document.createElement('link');

                    if (attribute.rel) link.rel = attribute.rel;
                    if (attribute.type) link.type = attribute.type;
                    if (attribute.href) link.href = attribute.href;
                    if (attribute.as) link.as = attribute.as;
                    if (attribute.crossorigin) link.crossorigin = attribute.crossorigin;
                    if (attribute.media) link.media = attribute.media;

                    link.addEventListener('load', function() {}, false);

                    document.head.appendChild(link);
                }

                this.isEmptyOrNull = function(obj)
                {
                    if (obj === null || obj == 'undefined') return true;

                    if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
                    if (Array.isArray(obj)) return (obj.length === 0);
                    if (obj && obj.constructor === Object) return (Object.keys(obj).length === 0);

                    return !obj;
                }

                this.getBooleanAttribute = function(attribute, locale = 'en')
                {
                    if (attribute === true || attribute === false) return attribute;
                    if (this.isEmptyOrNull(attribute)) return false;
                    if (!this.isString(attribute)) return false;

                    const token = attribute.trim().toLocaleLowerCase(locale);

                    return symbol.get(token) || false;
                }

                this.getUniqueElementId = function(str = null, range = 100)
                {
                    let elName = function() { return str + Math.floor(Math.random() * range) };
                    let el = null;

                    while (document.getElementById(el = elName())) {};

                    return el;
                }

                this.removeDuplcates = function(obj, sort)
                {
                    const key = JSON.stringify;
                    let ar = [...new Map (obj.map(node => [key(node), node])).values()];

                    return sort ? ar.sort((a, b) => a - b) : ar;
                }

                this.inspect = function(diagnostic)
                {
                    if (this.isEmptyOrNull(diagnostic)) return this.inspect({ type: protean.error, notification: resource.inspect });

                    const lookup = {
                        [protean.notify]: function() { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                        [protean.error]: function() { this.errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace } ); },
                        [protean.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + protean.newline + protean.newline + diagnostic.reference); },
                        [protean.default]: function() { this.errorHandler({ notification: resource.errordefault, alert: diagnostic.logtrace } ); }
                    };

                    return lookup[diagnostic.type]() || lookup[protean.default];
                }

                this.errorHandler = function(error)
                {
                    if (this.isEmptyOrNull(error)) return this.inspect({ type: protean.error, notification: resource.errorHandler });

                    const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
                    console.error(err);

                    if (error.alert) alert(err);

                    return false;
                }

                this.getObjectProperties = function(object, str = '')
                {
                    for (let property in object) str += property + ': ' + object[property] + ', ';
                    return str.replace(/, +$/g,'');
                }

                function setPrecursors()
                {
                    symbol.set('true', true);
                    symbol.set('t', true);
                    symbol.set('yes', true);
                    symbol.set('y', true);
                    symbol.set('1', true);

                    protean.reference = 1;
                    protean.notify = 2;
                    protean.default = 98;
                    protean.error = 99;
                    protean.isWindows = (navigator.appVersion.indexOf('Win') != -1);
                    protean.newline = protean.isWindows ? '\r\n' : '\n';

                    Object.freeze(protean);

                    resource.inspect = 'Error: An exception occurred in the inspect method.  The diagnostic argument was empty or null';
                    resource.errorhandler = 'Error: An exception occurred in the errorhandler method.  The error argument was empty or null';
                    resource.errordefault = 'An unexpected error has occurred. The inspection type was missing or invalid';

                    Object.freeze(resource);
                }

            }).call(rsc);

            var caching = {};
            (function(cache) {

                'use strict';

                this.available = ('caches' in window);

                this.installCache = function(namedCache, urlArray, urlImage = '/images/NAVCogs.png')
                {
                    window.addEventListener('install', function(e)
                    {
                        e.waitUntil(caches.open(namedCache).then(function(cache) { return cache.addAll(urlArray); }));
                    });

                    window.addEventListener('fetch', function(e)
                    {
                        e.respondWith(caches.match(e.request).then(function(response)
                        {
                            if (response !== undefined)
                            {
                                return response;

                            } else {

                                return fetch(e.request).then(function (response)
                                {
                                    let responseClone = response.clone();

                                    caches.open(namedCache).then(function (cache) { cache.put(e.request, responseClone); });

                                    return response;

                                }).catch(function () {

                                    return caches.match(urlImage);

                                });

                            }

                        }));

                    });

                }

            }).call(caching);

        }



    }); // end HTMLElement extension

//}).call(window);
