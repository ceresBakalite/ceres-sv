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
export { ceres };

import { resource as rsc, caching } from './ceres-sv-lib.min.js';
//import { resource as rsc, caching } from 'https://ceresbakalite.github.io/ceres-sv/repos/csvjs/ceres-sv-lib.js';

var ceres = {};
(function()
{
    'use strict';

    //this.getSlide = function(el) { slideIndex(el); };  // global scope method reference

    const csv = 'ceres-sv'; // required ceres slideview element name
    const config = new class { constructor() {} } // ceres slideview configuration attributes

    let slideIndex = function (el)
    {
        const symbol = new Map();

        symbol.set('left', config.slide - 1);
        symbol.set('right', config.slide + 1);
        symbol.set('nub', Number.parseInt(el.id.replace(csv + '-nub', ''), 10));

        config.slide = symbol.get(el.className);
    }

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(el) { config.bindSlide.call(slideIndex(el)); };  // global scope method reference

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
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
                config.bindSlide = setSlide.bind(ceres);
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
                    slideContainer.className = 'slideview fade';

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
                        rsc.composeElement({ el: 'span', id: csv + '-nub' + index, classValue: 'nub', parent: trackContainer, onClickEvent: getClickEvent() });
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
                const slides = shadow.querySelectorAll('div.slideview');

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

        }

    }); // end HTMLElement extension

}).call(window);
