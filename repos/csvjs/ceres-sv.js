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
export { ceres as csv }

import { resource as rsc } from './ceres-sv-lib.min.js'

var ceres = {};
(function()
{
    'use strict';

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(target, calc) { setSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

    let csr = new class // ceres slideview resource
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

            if (csv.isCssList = !rsc.isEmptyOrNull(css)) await ( await fetchStylesheets(css) );
            if (csv.isCallbackList = !rsc.isEmptyOrNull(src)) this.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            if (slideviewHasAttributes()) activateSlideView();
        }

    });

    let progenitor = function()
    {
        csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];

        const progenitor = !rsc.isEmptyOrNull(csv.progenitor);

        if (progenitor)
        {
            csv.attribute.ptr = !rsc.getBooleanAttribute(csv.progenitor.getAttribute('ptr'));
            csv.attribute.sur = !rsc.getBooleanAttribute(csv.progenitor.getAttribute('sur'));
            csv.attribute.sub = !rsc.getBooleanAttribute(csv.progenitor.getAttribute('sub'));
            csv.attribute.trace = rsc.getBooleanAttribute(csv.progenitor.getAttribute('trace'));
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 250;

            Object.freeze(csv.attribute);
        }

        return progenitor;
    }

    let precursor = function()
    {
        csr.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + rsc.constant.newline + rsc.constant.newline;
        csr.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.isCallbackList) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + rsc.constant.newline;
        csr.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
        csr.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
        csr.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
        csr.attribute.ProgenitorNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element';
        csr.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

        Object.freeze(csr.attribute);

        csv.progenitor.id = rsc.getUniqueElementId(csv.attribute.HTMLSlideViewElement);
        csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];

        return (csv.isCallbackList || csv.listElement);
    }

    let isImageArray = function()
    {
        rsc.inspect({ type: rsc.constant.notify, notification: csr.attribute.CSVObjectAttributes + rsc.getObjectProperties(csv.attribute), logtrace: csv.attribute.trace });

        let getImageList = function()
        {
            let getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(csv.progenitor.textContent)) ? csv.progenitor.textContent : null; }

            let getBodyContentList = function()
            {
                rsc.inspect({ type: rsc.constant.notify, notification: csr.attribute.BodyContentList, logtrace: csv.attribute.trace });

                const list = !rsc.isEmptyOrNull(csv.listElement) ? csv.listElement.textContent : null;
                return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.attribute.BodyContentListNotFound, logtrace: csv.attribute.trace });
            }

            return (csv.isCallbackList) ? getConnectedCallbackList() : getBodyContentList();
        }

        let imageList = getImageList();
        if (imageList) rsc.inspect({ type: rsc.constant.notify, notification: csr.attribute.ListContainerMarkup + imageList, logtrace: csv.attribute.trace });

        csv.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;

        return !rsc.isEmptyOrNull(csv.imageArray);
    }

    let slideviewHasAttributes = function()
    {
        if (!progenitor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.attribute.ProgenitorNotFound, logtrace: csv.attribute.trace });
        if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.attribute.ListContainerNotFound, logtrace: csv.attribute.trace });

        return isImageArray();
    }

    function getSlideView()
    {
        let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
        let getSurtitle = function() { return (csv.attribute.sur) ? imageIndex + ' / ' + csv.imageArray.length : null; }
        let getSubtitle = function() { return (csv.attribute.sub) ? getAccessibilityText() : null; }
        let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

        rsc.clearElement(csv.progenitor);

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        rsc.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

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

            rsc.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
            rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        rsc.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(-1, true)' });
        rsc.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(1, true)' });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            setSlide(csv.index = csv.index += offset);
        }

        rsc.inspect({ type: rsc.constant.notify, notification: csv.progenitor, logtrace: csv.attribute.trace });

        function getSlideViewPointerContainer()
        {
            const pointerElement = document.createElement('div');
            let getClickEvent = function() { return 'window.getSlide(' + pointerIndex + ')'; }

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';

            csv.progenitor.appendChild(document.createElement('br'));
            csv.progenitor.appendChild(pointerElement);

            rsc.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                var pointerIndex = item + 1;
                rsc.composeElement({ el: 'span', id: 'slideview-ptr' + pointerIndex, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
            }

            csv.progenitor.appendChild(document.createElement('br'));
        }

    }

    function fetchStylesheets(arrayString)
    {
        const cssArray = csv.isCssList ? arrayString.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            rsc.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: cssArray[item], as: 'style' });
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
        const nodelist = document.querySelectorAll('img.slide, #' + csv.progenitor.id);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

}).call(window);
