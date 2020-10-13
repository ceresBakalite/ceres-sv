export { ceres }

import { cereslibrary as clib } from 'https://ceresbakalite.github.io/ceres-sv/repos/prod/ceres-sv-lib.js';

var ceres = {};
(function(slideview)
{
    'use strict';

    slideview.tabImage = function(el) { tabImage(el); }; // global scope method reference
    slideview.getSlide = function(target, calc) { getSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

    clib.test1();
    clib.test2('hello from ceres');

    class Component
    {
        constructor()
        {
            this.type = function() { return type; },
            this.attribute = function() { return attribute; }
        }

    }

    let resource = new Component();

    class Slideviewer
    {
        constructor()
        {
            this.progenitor = null;
            this.imageArray = null,
            this.listElement = null,
            this.attribute = function() { return attribute; },
            this.callback = false,
            this.index = 1
        }

    }

    let csv = new Slideviewer();

    csv.attribute.HTMLSlideViewElement = 'ceres-sv'; // required element name
    csv.attribute.HTMLImageListElement = 'ceres-csv'; // optional markup noscript tag id when using embedded image lists
    csv.attribute.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/repos/prod/ceres-sv.css'; // the default slideview stylesheet

    String.prototype.isEmpty = function()
    {
        return (this.length === 0 || !this.trim());
    };

    window.customElements.get(csv.attribute.HTMLSlideViewElement) || window.customElements.define(csv.attribute.HTMLSlideViewElement, class extends HTMLElement
    {
        async connectedCallback()
        {
            const css = this.getAttribute('css') ? this.getAttribute('css') : csv.attribute.defaultCSS;
            if (!css.clib.isEmpty()) await ( await importSlideViewStylesheets(css) );

            const src = this.getAttribute('src') ? this.getAttribute('src') : null;
            if (!src.isEmpty()) this.innerHTML =  await ( await fetch(src)).text();

            if (getSlideviewAttributes()) activateSlideView();
        }

    });

    function getSlideviewAttributes()
    {
        if (!getProgenitor()) return inspect(resource.type.error, resource.attribute.ProgenitorNotFound);
        if (!getAttributePrecursors()) return inspect(resource.type.error, resource.attribute.ListContainerNotFound);

        return getImageArray();

        function getProgenitor()
        {
            resource.type.reference = 1;
            resource.type.notify = 2;
            resource.type.error = 99;

            resource.attribute.ProgenitorNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element';

            csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];

            return (csv.progenitor) ? true : false;
        }

        function getAttributePrecursors()
        {
            const newline = '\n';

            csv.progenitor.id = csv.attribute.HTMLSlideViewElement;

            csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];
            csv.callback = csv.progenitor.getAttribute('src') ? true : false;

            csv.attribute.ptr = (csv.progenitor.getAttribute('ptr')) ? getBoolean(csv.progenitor.getAttribute('ptr')) : true;
            csv.attribute.sur = (csv.progenitor.getAttribute('sur')) ? getBoolean(csv.progenitor.getAttribute('sur')) : true;
            csv.attribute.sub = (csv.progenitor.getAttribute('sub')) ? getBoolean(csv.progenitor.getAttribute('sub')) : true;
            csv.attribute.trace = (csv.progenitor.getAttribute('trace')) ? getBoolean(csv.progenitor.getAttribute('trace')) : false;
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 500;

            Object.freeze(csv.attribute);

            resource.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + newline + newline;
            resource.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + newline;
            resource.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
            resource.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
            resource.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
            resource.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

            Object.freeze(resource.attribute);

            return (csv.callback || csv.listElement) ? true : false;
        }

        function getImageArray()
        {
            inspect(resource.type.notify, resource.attribute.CSVObjectAttributes + getAttributeProperties());

            let imageList = getImageList();
            if (imageList) inspect(resource.type.notify, resource.attribute.ListContainerMarkup + imageList);

            csv.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;

            return (csv.imageArray) ? true : false;

            function getImageList()
            {
                return (csv.callback) ? getConnectedCallbackList() : getBodyContentList();

                function getConnectedCallbackList()
                {
                    return (csv.progenitor.textContent) ? csv.progenitor.textContent : null;
                }

                function getBodyContentList()
                {
                    inspect(resource.type.notify, resource.attribute.BodyContentList);

                    const list = (csv.listElement) ? csv.listElement.textContent : null;
                    return (list) ? list : inspect(resource.type.error, resource.attribute.BodyContentListNotFound);
                }

            }

            function getAttributeProperties()
            {
                let str = '';
                for (let property in csv.attribute) str += property + ': ' + csv.attribute[property] + ', ';

                return str.replace(/, +$/g,'');
            }

        }

    }

    function inspect(type, response)
    {
        const lookup = {
            [resource.type.notify]: function() { if (csv.attribute.trace) console.log(response); },
            [resource.type.error]: function() { errorHandler(response); },
            'default': 'An unexpected error has occurred - ' + csv.attribute.HTMLSlideViewElement + ' is unresponsive'
        };

        return lookup[type]() || lookup['default'];
    }

    function errorHandler(str)
    {
        const err = str + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (csv.attribute.trace) alert(err);

        return false;
    }

    function getSlideView()
    {
        csv.progenitor.innerHTML = null;

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

        for (let item = 0; item < csv.imageArray.length; item++)
        {
            var arrayItem = csv.imageArray[item].split(',');

            let qualifier = item + 1;
            let id = 'slideview' + qualifier;

            let elements = {
                'surName': 'slideview-sur' + qualifier,
                'imgName': 'slideview-img' + qualifier,
                'subName': 'slideview-sub' + qualifier
            };

            composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle(qualifier) });
            composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEventValue: 'window.tabImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEventValue: 'window.getSlide(-1, true)', url: getURL() });
        composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEventValue: 'window.getSlide(1, true)', url: getURL() });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        inspect(resource.type.notify, resource.attribute.ProgenitorInnerHTML + csv.progenitor.innerHTML);

        function setHorizontalSwipe(touch, callback, args)
        {
            const el = document.querySelector(touch.el);

            if (!touch.act) touch.act = 10;

            el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; });

            el.addEventListener('touchend', e =>
            {
                touch.end = e.changedTouches[0].screenX;

                if (Math.abs(touch.start - touch.end) > touch.act)
                {
                    args.action = (touch.start > touch.end) ? true : false;
                    callback.call(this, args);
                }

            });

        }

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            getSlide(csv.index = csv.index += offset);
        }

        function getSlideViewPointerContainer()
        {
            csv.progenitor.appendChild(document.createElement('br'));

            const pointerElement = document.createElement('div');

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';
            csv.progenitor.appendChild(pointerElement);

            composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                let qualifier = item + 1;
                let svpname = 'slideview-ptr' + qualifier;

                composeElement({ el: 'span', id: svpname, classValue: 'ptr', parent: pointerElement, onClickEventValue: getClickEventValue(qualifier) });
            }

            csv.progenitor.appendChild(document.createElement('br'));

            function getClickEventValue(indexItem)
            {
                return 'window.getSlide(' + indexItem + ')';
            }

        }

        function getURL()
        {
            return (!arrayItem[0].isEmpty()) ? arrayItem[0].trim() : null;
        }

        function getSurtitle(indexItem)
        {
            return (csv.attribute.sur) ? indexItem + ' / ' + csv.imageArray.length : null;
        }

        function getSubtitle()
        {
            return (csv.attribute.sub) ? getAccessibilityText() : null;
        }

        function getAccessibilityText()
        {
            return (!arrayItem[1].isEmpty()) ? arrayItem[1].trim() : null;
        }

    }

    function importSlideViewStylesheets(str)
    {
        const cssArray = (str) ? str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            importStylesheet(cssArray[item]);
        }

    }


    function importStylesheet(url)
    {
        if (!url) return;

        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.as = 'style';

        onloadListener();
        addEventListener();
        onReadyStateChangeListener();

        document.head.appendChild(link);

        function onloadListener()
        {
            link.onload = function () {}
        }

        function addEventListener()
        {
            if (link.addEventListener)
            {
                link.addEventListener('load', function() {}, false);
            }

        }

        function onReadyStateChangeListener()
        {
            link.onreadystatechange = function()
            {
                const state = link.readyState;

                if (state === 'loaded' || state === 'complete')
                {
                    link.onreadystatechange = null;
                }

            };

        }

    }

    function tabImage(el)
    {
        window.open(el.getAttribute('src'), 'image');
    }

    function getSlide(targetIndex)
    {
        const slides = document.querySelectorAll('div.slideview');

        csv.index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : csv.index;

        slides.forEach(node => { node.style.display = 'none'; } );
        slides[csv.index-1].style.display = 'block';

        if (csv.attribute.ptr) setPointer();

        function setPointer()
        {
            const pointers = document.querySelectorAll('span.ptr');
            const el = document.querySelector('span.active');

            if (el) el.className = 'ptr';
            pointers[csv.index-1].className += ' active';
        }

    }

    function composeElement(element)
    {
        const el = document.createElement(element.el);

        el.id = element.id;
        element.parent.appendChild(el);

        if (element.classValue) composeAttribute({ id: el.id, type: 'class', value: element.classValue });
        if (element.onClickEventValue) composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEventValue });
        if (element.url) composeAttribute({ id: el.id, type: 'src', value: element.url });
        if (element.accessibility) composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
        if (element.markup) document.getElementById(el.id).innerHTML = element.markup;
    }

    function composeAttribute(attribute)
    {
        const el = document.getElementById(attribute.id);

        if (el)
        {
            const attributeNode = document.createAttribute(attribute.type);
            attributeNode.value = attribute.value;

            el.setAttributeNode(attributeNode);
        }

    }

    function activateSlideView()
    {
        csv.progenitor.style.display = 'none';

        getSlideView();
        getSlide();

        setTimeout(function() { setSlideViewDisplay('block'); }, csv.attribute.delay);
    }


    function setSlideViewDisplay(attribute)
    {
        const nodelist = document.querySelectorAll('a.prev, a.next, div.subtitle, div.surtitle, img.slide, #' + csv.attribute.HTMLSlideViewElement);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

    function getBoolean(symbol)
    {
        const token = symbol.trim().toUpperCase();

        if (!token) return false;

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

    String.prototype.isBoolean = function()
    {
        const token = this.trim().toUpperCase();

        if (!token) return false;

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

})(window);
