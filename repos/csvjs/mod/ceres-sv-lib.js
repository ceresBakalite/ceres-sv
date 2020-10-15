export { cereslibrary }

var cereslibrary = {};
(function()
{
    'use strict';

    this.reference = 1;
    this.notify = 2;
    this.error = 99;
    this.isWindows = (navigator.appVersion.indexOf("Win") != -1);
    this.newline = this.isWindows ? '\r\n' : '\n';

    this.setHorizontalSwipe = function(touch, callback, args)
    {
        const el = document.querySelector(touch.el);

        if (!touch.act) touch.act = 10;

        el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, {  passive: true } );

        el.addEventListener('touchmove', e => { e.preventDefault(); }, {  passive: true });

        el.addEventListener('touchend', e =>
        {
            touch.end = e.changedTouches[0].screenX;

            if (Math.abs(touch.start - touch.end) > touch.act)
            {
                args.action = (touch.start > touch.end) ? true : false;
                callback.call(this, args);
            }

        }, {  passive: true });

    }

    this.importLinkElement = function(obj)
    {
        if (this.isEmptyOrNull(obj)) return;

        const link = document.createElement('link');

        if (obj.rel) link.rel = obj.rel;
        if (obj.type) link.type = obj.type;
        if (obj.href) link.href = obj.href;
        if (obj.as) link.as = obj.as;
        if (obj.crossorigin) link.crossorigin = obj.crossorigin;
        if (obj.media) link.media = obj.media;

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

            }

        }

    }

    this.composeElement = function(obj)
    {
        const el = document.createElement(obj.el);

        el.id = obj.id;
        obj.parent.appendChild(el);

        if (obj.classValue) this.composeAttribute({ id: el.id, type: 'class', value: obj.classValue });
        if (obj.onClickEventValue) this.composeAttribute({ id: el.id, type: 'onclick', value: obj.onClickEventValue });
        if (obj.url) this.composeAttribute({ id: el.id, type: 'src', value: obj.url });
        if (obj.accessibility) this.composeAttribute({ id: el.id, type: 'alt', value: obj.accessibility });
        if (obj.markup) document.getElementById(el.id).innerHTML = obj.markup;
    }

    this.composeAttribute = function(obj)
    {
        const el = document.getElementById(obj.id);

        if (el)
        {
            const attributeNode = document.createAttribute(obj.type);
            attributeNode.value = obj.value;

            el.setAttributeNode(attributeNode);
        }

    }

    this.isString = function(obj)
    {
        return Object.prototype.toString.call(obj) == '[object String]';
    }

    this.windowOpen = function(obj)
    {
        window.open(obj.element.getAttribute('src'), obj.type);
    }

    this.isEmptyOrNull = function(obj)
    {
        if (obj === null) return true;
        if (this.isString(obj)) return (obj.length === 0 || !obj.trim());

        return obj.isEmpty();

        Object.prototype.isEmpty = function()
        {
            for (let key in this)
            {
                if (this.hasOwnProperty(key)) return false;
            }

            return true;
        }

    }

    this.getBooleanAttribute = function(obj)
    {
        if (obj === true || obj === false) return obj;
        if (this.isEmptyOrNull(obj)) return false;
        if (!this.isString(obj)) return false;

        const token = obj.trim().toUpperCase();

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

    this.inspect = function(obj)
    {
        const lookup = {
            [this.reference]: function() { if (obj.logtrace) console.log('Reference: ' + this.newline + this.newline + obj.reference); },
            [this.notify]: function() { if (obj.logtrace) console.log(obj.notification); },
            [this.error]: function() { this.errorHandler({ notification: obj.notification, alert: obj.logtrace } ); },
            'default': 'An unexpected error has occurred...'
        };

        return lookup[obj.type]() || lookup['default'];
    }

    this.errorHandler = function(obj)
    {
        const err = obj.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (obj.alert) alert(err);

        return false;
    }

}).call(cereslibrary);
