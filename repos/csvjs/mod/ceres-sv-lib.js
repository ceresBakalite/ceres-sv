export { cereslibrary }

var cereslibrary = {};
(function()
{
    'use strict';

    class Component
    {
        constructor()
        {
            this.protean = function() { return protean; },
            this.attribute = function() { return attribute; }
        }

    }

    let resource = new Component();
    let symbol = new Map();

    setPrecursors();

    this.constant = resource.protean; // expose some local scope literals

    Object.freeze(this.constant);

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
                args.action = (touch.start > touch.end) ? true : false;
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
        if (element.onClickEventValue) this.composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEventValue });
        if (element.url) this.composeAttribute({ id: el.id, type: 'src', value: element.url });
        if (element.accessibility) this.composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
        if (element.markup) document.getElementById(el.id).innerHTML = element.markup;
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

    this.windowOpen = function(obj)
    {
        window.open(obj.element.getAttribute('src'), obj.type);
    }

    this.isString = function(obj)
    {
        return Object.prototype.toString.call(obj) == '[object String]';
    }

    this.isEmptyOrNull = function(obj)
    {
        if (obj === null || obj == 'undefined') return true;

        if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
        if (Array.isArray(obj)) return (obj.length === 0);
        if (obj.constructor === Object) return (Object.keys(obj).length === 0);

        return !obj;
    }

    this.getBooleanAttribute = function(attribute)
    {
        if (attribute === true || attribute === false) return attribute;
        if (this.isEmptyOrNull(attribute)) return false;
        if (!this.isString(attribute)) return false;

        const token = attribute.trim().toLowerCase();

        return symbol.has(token) ? symbol.get(token) : false;
    }

    this.parseHTML = function(node)
    {
        // const fragment = document.createRange().createContextualFragment(html);
        // return fragment;
        let parser = new DOMParser();
        return parser.parseFromString(node, 'text/html');
        //return (new XMLSerializer().serializeToString(html));
    }

    this.inspect = function(diagnostic)
    {
        if (this.isEmptyOrNull(diagnostic)) return this.inspect({ type: resource.protean.error, notification: resource.attribute.inspect });

        const lookup = {
            [resource.protean.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + resource.protean.newline + resource.protean.newline + diagnostic.reference); },
            [resource.protean.notify]: function() { if (diagnostic.logtrace) console.log(diagnostic.notification); },
            [resource.protean.error]: function() { this.errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace } ); },
            'default': 'An unexpected error has occurred...'
        };

        return lookup[diagnostic.type]() || lookup['default'];
    }

    this.errorHandler = function(error)
    {
        if (this.isEmptyOrNull(error)) return this.inspect({ type: resource.protean.error, notification: resource.attribute.errorHandler });

        const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (error.alert) alert(err);

        return false;
    }

    function setPrecursors()
    {
        symbol.set('true', true);
        symbol.set('t', true);
        symbol.set('yes', true);
        symbol.set('y', true);
        symbol.set('1', true);
        symbol.set('default', false);

        resource.protean.reference = 1;
        resource.protean.notify = 2;
        resource.protean.error = 99;
        resource.protean.isWindows = (navigator.appVersion.indexOf('Win') != -1);
        resource.protean.newline = resource.protean.isWindows ? '\r\n' : '\n';

        resource.attribute.inspect = 'Error: An exception occurred in the inspect method.  The diagnostic argument was empty or null';
        resource.attribute.errorhandler = 'Error: An exception occurred in the errorhandler method.  The error argument was empty or null';
    }

}).call(cereslibrary);
