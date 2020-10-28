/**
 * @license
 * ceres-sv-lib v1.0.0
 *
 * Minified using terser v5.3.5
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-sv-lib.js
 *
 * ceresBakalite/ceres-sv-lib is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2020 Alexander Munro
*/
export { resource, caching }

var resource = {};
(function()
{
    'use strict';

    const protean = function() { return attribute; }
    const resource = function() { return attribute; }
    const symbol = new Map();

    setPrecursors();

    this.constant = protean; // exposed local scope attributes

    Object.freeze(this.constant);

    this.getImportMetaUrl = function() { return import.meta.url; }
    this.windowOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
    this.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
    this.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }

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
            [protean.notify]: function() { if (diagnostic.logtrace) console.log(diagnostic.notification); },
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
        console.log(err);

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

}).call(resource);

var caching = {};
(function(cache) {

    'use strict';

    this.installCache = function(namedCache, urlArray, urlImage = '/images/NAVCogs.png')
    {
        if (!'caches' in window) return;

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
