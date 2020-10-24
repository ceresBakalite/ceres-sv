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
export { slideview }

import { resoure as svl } from './ceres-sv-lib.min.js'

var slideview = {};
(function()
{
    'use strict';

    this.getImage = function(el) { svl.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(target, calc) { setSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

    let rsc = new class // resource
    {
        constructor()
        {
            this.type = function() { return type; },
            this.attribute = function() { return attribute; }
        }

    }

    let csv = new class // ceres slideview
    {
        constructor()
        {
            this.progenitor = null,
            this.listElement = null,
            this.imageArray = [],
            this.attribute = function() { return attribute; },
            this.isCallbackList = false,
            this.isCssList = false,
            this.index = 1
        }

    }

    Object.seal(rsc);
    Object.seal(csv);

    csv.attribute.HTMLSlideViewElement = 'ceres-sv'; // required element name
    csv.attribute.HTMLImageListElement = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
    csv.attribute.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet

    window.customElements.get(csv.attribute.HTMLSlideViewElement) || window.customElements.define(csv.attribute.HTMLSlideViewElement, class extends HTMLElement
    {
        async connectedCallback()
        {
            const css = this.getAttribute('css') ? this.getAttribute('css') : csv.attribute.defaultCSS;
            const src = this.getAttribute('src') ? this.getAttribute('src') : null;

            if (csv.isCssList = !svl.isEmptyOrNull(css)) await ( await fetchStylesheets(css) );
            if (csv.isCallbackList = !svl.isEmptyOrNull(src)) this.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            if (slideviewHasAttributes()) activateSlideView();
        }

    });

    let progenitor = function()
    {
        csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];

        const progenitor = !svl.isEmptyOrNull(csv.progenitor);

        if (progenitor)
        {
            csv.attribute.ptr = !svl.getBooleanAttribute(csv.progenitor.getAttribute('ptr'));
            csv.attribute.sur = !svl.getBooleanAttribute(csv.progenitor.getAttribute('sur'));
            csv.attribute.sub = !svl.getBooleanAttribute(csv.progenitor.getAttribute('sub'));
            csv.attribute.trace = svl.getBooleanAttribute(csv.progenitor.getAttribute('trace'));
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 250;

            Object.freeze(csv.attribute);
        }

        return progenitor;
    }

    let precursor = function()
    {
        rsc.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + svl.constant.newline + svl.constant.newline;
        rsc.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.isCallbackList) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + svl.constant.newline;
        rsc.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
        rsc.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
        rsc.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
        rsc.attribute.ProgenitorNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element';
        rsc.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

        Object.freeze(rsc.attribute);

        csv.progenitor.id = svl.getUniqueElementId(csv.attribute.HTMLSlideViewElement);
        csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];

        return (csv.isCallbackList || csv.listElement);
    }

    let isImageArray = function()
    {
        svl.inspect({ type: svl.constant.notify, notification: rsc.attribute.CSVObjectAttributes + svl.getObjectProperties(csv.attribute), logtrace: csv.attribute.trace });

        let getImageList = function()
        {
            let getConnectedCallbackList = function() { return (!svl.isEmptyOrNull(csv.progenitor.textContent)) ? csv.progenitor.textContent : null; }

            let getBodyContentList = function()
            {
                svl.inspect({ type: svl.constant.notify, notification: rsc.attribute.BodyContentList, logtrace: csv.attribute.trace });

                const list = !svl.isEmptyOrNull(csv.listElement) ? csv.listElement.textContent : null;
                return !svl.isEmptyOrNull(list) ? list : svl.inspect({ type: svl.constant.error, notification: rsc.attribute.BodyContentListNotFound, logtrace: csv.attribute.trace });
            }

            return (csv.isCallbackList) ? getConnectedCallbackList() : getBodyContentList();
        }

        let imageList = getImageList();
        if (imageList) svl.inspect({ type: svl.constant.notify, notification: rsc.attribute.ListContainerMarkup + imageList, logtrace: csv.attribute.trace });

        csv.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;

        return !svl.isEmptyOrNull(csv.imageArray);
    }

    let slideviewHasAttributes = function()
    {
        if (!progenitor()) return svl.inspect({ type: svl.constant.error, notification: rsc.attribute.ProgenitorNotFound, logtrace: csv.attribute.trace });
        if (!precursor()) return svl.inspect({ type: svl.constant.error, notification: rsc.attribute.ListContainerNotFound, logtrace: csv.attribute.trace });

        return isImageArray();
    }

    function getSlideView()
    {
        let getURL = function() { return (!svl.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
        let getSurtitle = function() { return (csv.attribute.sur) ? imageIndex + ' / ' + csv.imageArray.length : null; }
        let getSubtitle = function() { return (csv.attribute.sub) ? getAccessibilityText() : null; }
        let getAccessibilityText = function() { return (!svl.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

        svl.clearElement(csv.progenitor);

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        svl.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

        for (let item = 0; item < csv.imageArray.length; item++)
        {
            var arrayItem = csv.imageArray[item].split(',');
            var imageIndex = item + 1;

            let id = 'slideview' + imageIndex;

            let elements = {
                'surName': 'slideview-sur' + imageIndex,
                'imgName': 'slideview-img' + imageIndex,
                'subName': 'slideview-sub' + imageIndex
            };

            svl.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) svl.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
            svl.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) svl.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        svl.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(-1, true)' });
        svl.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(1, true)' });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        svl.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            setSlide(csv.index = csv.index += offset);
        }

        svl.inspect({ type: svl.constant.notify, notification: csv.progenitor, logtrace: csv.attribute.trace });

        function getSlideViewPointerContainer()
        {
            const pointerElement = document.createElement('div');
            let getClickEvent = function() { return 'window.getSlide(' + pointerIndex + ')'; }

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';

            csv.progenitor.appendChild(document.createElement('br'));
            csv.progenitor.appendChild(pointerElement);

            svl.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                var pointerIndex = item + 1;
                svl.composeElement({ el: 'span', id: 'slideview-ptr' + pointerIndex, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
            }

            csv.progenitor.appendChild(document.createElement('br'));
        }

    }

    function fetchStylesheets(arrayString)
    {
        const cssArray = csv.isCssList ? arrayString.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            svl.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: cssArray[item], as: 'style' });
        }

    }

    function setSlide(targetIndex)
    {
        const slides = document.querySelectorAll('div.slideview');

        csv.index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : csv.index;

        slides.forEach(node => { node.style.display = 'none'; } );
        slides[csv.index-1].style.display = 'block';

        if (csv.attribute.ptr) setPointerStyle();

        function setPointerStyle()
        {
            const pointers = document.querySelectorAll('span.ptr');
            const el = document.querySelector('span.active');

            if (el) el.className = 'ptr';
            pointers[csv.index-1].className += ' active';
        }

    }

    function activateSlideView()
    {
        csv.progenitor.style.display = 'none';

        getSlideView();
        setSlide();

        setTimeout(function() { setSlideViewDisplay('block'); }, csv.attribute.delay);
    }


    function setSlideViewDisplay(attribute)
    {
        //const nodelist = document.querySelectorAll('img.slide, #' + csv.progenitor.id);
        const nodelist = document.querySelectorAll('img.slide, #' + csv.attribute.HTMLSlideViewElement);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

}).call(window);
