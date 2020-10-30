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

var ceres = {};
(function()
{
    'use strict';

    const csv = 'ceres-sv'; // required element name

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        constructor() { super(); }

        getSlide(target, calc) { this.setSlide(this.slide = (calc) ? this.slide += target : target); };  // global scope method reference

        async connectedCallback()
        {
            let csr = function() { return attribute; } // ceres slideview resource attributes
            let config = new class // ceres slideview configuration attributes
            {
                constructor()
                {
                    this.noscriptId = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
                    this.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet

                    this.index = 0,
                    this.slide = 1,
                    this.progenitor = null;
                    this.noscript = null;
                    this.imageArray = null;
                    this.callback = false;

                    this.attributes = function() { return attribute; }
                    this.cache = function() { return attribute; }
                }

            }

            Object.seal(config);

            config.progenitor = this;
            config.cache.css = [];
            config.cache.src = [];

            let css = this.getAttribute('css') || config.defaultCSS;
            let src = this.getAttribute('src') || null;

            if (!rsc.isEmptyOrNull(css)) await ( await fetchStylesheets(css) );
            if (config.callback = !rsc.isEmptyOrNull(src)) this.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            config.cache.src = config.cache.src.concat(src);

            if (slideviewHasAttributes()) activateSlideView();

            let progenitor = function()
            {
                const exists = !rsc.isEmptyOrNull(config.progenitor);

                if (exists)
                {
                    config.progenitor.id = rsc.getUniqueElementId(csv);
                    config.noscript = document.getElementById(config.noscriptId) || document.getElementsByTagName('noscript')[config.index];

                    config.attributes.ptr = !rsc.getBooleanAttribute(config.progenitor.getAttribute('ptr'));
                    config.attributes.sur = !rsc.getBooleanAttribute(config.progenitor.getAttribute('sur'));
                    config.attributes.sub = !rsc.getBooleanAttribute(config.progenitor.getAttribute('sub'));
                    config.attributes.cache = !rsc.getBooleanAttribute(config.progenitor.getAttribute('cache'));
                    config.attributes.trace = rsc.getBooleanAttribute(config.progenitor.getAttribute('trace'));
                    config.attributes.delay = Number.isInteger(parseInt(config.progenitor.getAttribute('delay'))) ? parseInt(config.progenitor.getAttribute('delay')) : 250;
                }

                return exists;
            }

            let precursor = function()
            {
                csr.listContainerMarkup = 'Image list markup ' + ((config.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv + ']:' + rsc.constant.newline;
                csr.bodyContentList = 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
                csr.bodyContentListNotFound = 'Error: Unable to find the ' + csv + ' fallback noscript image list when searching the document body';
                csr.configAttributes = 'The ' + csv + ' element attributes after initialisation: ';
                csr.progenitorNotFound = 'Error: Unable to find the ' + csv + ' document element';
                csr.imageListNotFound = 'Error: Unable to find either the connectedCallback ' + csv + ' attribute source nor the fallback noscript image list container';

                Object.freeze(csr);

                return config.callback || config.noscript;
            }

            let attributesExist = function()
            {
                config.imageArray = null;

                rsc.inspect({ type: rsc.constant.notify, notification: csr.configAttributes + rsc.getObjectProperties(config.attributes), logtrace: config.attributes.trace });

                const getImageList = function()
                {
                    const getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(config.progenitor.textContent)) ? config.progenitor.textContent : null; }

                    const getBodyContentList = function()
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.bodyContentList, logtrace: config.attributes.trace });

                        const list = !rsc.isEmptyOrNull(config.noscript) ? config.noscript.textContent : null;
                        return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.bodyContentListNotFound, logtrace: config.attributes.trace });
                    }

                    return config.callback ? getConnectedCallbackList() : getBodyContentList();
                }

                const isImageArray = function()
                {
                    let imageList = getImageList();

                    if (!rsc.isEmptyOrNull(imageList))
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.listContainerMarkup + imageList, logtrace: config.attributes.trace });
                        config.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                    }

                    Object.freeze(config.attributes);

                    return !rsc.isEmptyOrNull(config.imageArray);
                }

                return isImageArray();
            }

            function slideviewHasAttributes()
            {
                if (!progenitor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.progenitorNotFound, logtrace: config.attributes.trace });
                if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.imageListNotFound, logtrace: config.attributes.trace });

                return attributesExist();
            }

            function getSlideView()
            {
                let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                let getSurtitle = function() { return (config.attributes.sur) ? imageIndex + ' / ' + config.imageArray.length : null; }
                let getSubtitle = function() { return (config.attributes.sub) ? getAccessibilityText() : null; }
                let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

                rsc.clearElement(config.progenitor);

                const shadow = config.progenitor.attachShadow({mode: 'open'});

                const imageContainer = document.createElement('div');
                imageContainer.id = csv + '-image-container';
                config.progenitor.appendChild(imageContainer);

                rsc.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

                for (let item = 0; item < config.imageArray.length; item++)
                {
                    var arrayItem = config.imageArray[item].split(',');
                    var imageIndex = item + 1;

                    let id = 'slideview' + imageIndex;

                    let elements = {
                        'surName': 'slideview-sur' + imageIndex,
                        'imgName': 'slideview-img' + imageIndex,
                        'subName': 'slideview-sub' + imageIndex
                    };

                    rsc.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

                    let slideContainer = document.getElementById(id);

                    if (config.attributes.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                    rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
                    if (config.attributes.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                }

                rsc.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'this.parentElement.getSlide(-1, true)' });
                rsc.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'ceres.getSlide(1, true)' });

                if (config.attributes.ptr) getSlideViewPointerContainer();

                rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

                function getHorizontalSwipe(swipe)
                {
                    const offset = (swipe.action) ? swipe.right : swipe.left;
                    setSlide(config.slide = config.slide += offset);
                }

                rsc.inspect({ type: rsc.constant.notify, notification: config.progenitor, logtrace: config.attributes.trace });

                function getSlideViewPointerContainer()
                {
                    const pointerElement = document.createElement('div');
                    const getClickEvent = function() { return 'this.getSlide(' + pointerIndex + ')'; }

                    pointerElement.id = csv + '-pointer-container';

                    config.progenitor.appendChild(document.createElement('br'));
                    config.progenitor.appendChild(pointerElement);

                    rsc.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

                    for (let item = 0; item < config.imageArray.length; item++)
                    {
                        var pointerIndex = item + 1;
                        rsc.composeElement({ el: 'span', id: 'slideview-ptr' + pointerIndex, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
                    }

                    config.progenitor.appendChild(document.createElement('br'));
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

            function setSlide(target)
            {
                const slides = document.querySelectorAll('div.slideview');

                const setPointerStyle = function()
                {
                    const pointers = document.querySelectorAll('span.ptr');
                    const el = document.querySelector('span.active');

                    if (el) el.className = 'ptr';
                    pointers[config.slide-1].className += ' active';
                }

                config.slide = (target < 1) ? slides.length : (target > slides.length) ? 1 : config.slide;

                slides.forEach(node => { node.style.display = 'none'; } );
                slides[config.slide-1].style.display = 'block';

                if (config.attributes.ptr) setPointerStyle();
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
                const nodelist = document.querySelectorAll('img.slide, #' + config.progenitor.id);
                nodelist.forEach(node => { node.style.display = attribute; } );
            }

            function setCache()
            {
                const cacheName = csv + '-cache';
                config.cache.script = [ import.meta.url, rsc.getImportMetaUrl() ];

                if (caching.available) caching.installCache(cacheName, rsc.removeDuplcates(config.cache.css.concat(config.cache.src.concat(config.cache.script))));
            }

        }

    });

}).call(window);
