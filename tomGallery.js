(function() {

    function TomGallery(element, sets) {
        this.options = sets;
        this.element = element;
        this.currentSelection = {
            element: null,
            currentPos: {
                x: 50,
                y: 50
            },
            targetPos: {
                x: 50,
                y: 50
            },
            lastTS: 0

        };
        this.requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(func) {
                return setTimeout(func, 1 / 60);
            };
        this.initialize();

        if (!this.options.sensivity)
            this.options.sensivity = 0;
    };

    TomGallery.prototype.paceMaker = function() {
        var me = this;

        me.$timer = window.setInterval(function() {
            me.requestAnimationFrame.apply(window, [function() {
                me.tick.apply(me, arguments);
            }]);
        }, 1);
    };

    TomGallery.prototype.tick = function() {
        var me = this,
            selection = me.currentSelection,
            rightNow = Date.now(),
            timeDiff = (rightNow - selection.lastTS) / 1000;


        selection.lastTS = rightNow;

        if (!(selection.element && selection.element.classList.contains('expanded')))
            return;

        selection.currentPos.x = me.lerp(selection.currentPos.x, selection.targetPos.x, timeDiff);
        selection.currentPos.y = me.lerp(selection.currentPos.y, selection.targetPos.y, timeDiff);

        me.setCss3Style(selection.element, 'background-position', [selection.currentPos.x, '% ', selection.currentPos.y, '%'].join(''));
    };

    TomGallery.prototype.lerp = function(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    };

    TomGallery.prototype.toCamelCase = function(str) {
        return str.toLowerCase().replace(/(\-[a-z])/g, function($1) {
            return $1.toUpperCase().replace('-', '');
        });
    };

    TomGallery.prototype.setCss3Style = function(el, prop, val) {
        var me = this,
            vendors = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-', ''];

        for (var i = 0, l = vendors.length; i < l; i++) {
            var p = me.toCamelCase(vendors[i] + prop);

            if (p in el.style)
                el.style[p] = val;
        }
    };

    TomGallery.prototype.initialize = function() {
        var me = this;

        me.element.classList.add('tom-boy-Gallery');

        me.attachEvents();
        me.listImages();
        debugger;
        if (!(me.options.fullScreen == "contain"))
            me.paceMaker();
    };

    TomGallery.prototype.attachEvents = function() {
        var me = this;

        me.element.addEventListener('click', function() {
            me.onClick.apply(me, arguments);
        });

        me.element.addEventListener('transitionend', function(){
            me.onTransitionEnd.apply(me, arguments);
        });

        me.element.addEventListener('mousemove', function() {
            me.onMouseMove.apply(me, arguments);
        });
    };

    TomGallery.prototype.removeEvents = function() {
        var me = this;

        me.element.removeEventListener('click', function() {
            me.onClick.apply(me, arguments);
        });

        me.element.removeEventListener('transitionend', function(){
            me.onTransitionEnd.apply(me, arguments);
        });

        me.element.removeEventListener('mousemove', function() {
            me.onMouseMove.apply(me, arguments);
        });
    };

    TomGallery.prototype.listImages = function() {
        var me = this,
            images = me.options.images;

        for (var i = 0, ln = images.length; i < ln; i++) {
            var img = document.createElement('div');
            img.classList.add('image');
            img.style.backgroundImage = "url('" + images[i] + "')";
            me.element.appendChild(img);
        }
    };

    TomGallery.prototype.emptyGallery = function() {
        var me = this,
            elements = me.element.querySelectorAll('*');

        for (var i = 0, ln = elements.length; i < ln; i++)
            if (elements[i].parentNode)
                elements[i].parentNode.removeChild(elements[i]);
    };

    TomGallery.prototype.compressImages = function(image) {
        var me = this,
            images = me.element.querySelectorAll('.image');

        for (var i = 0, ln = images.length; i < ln; i++) {
            images[i].classList.remove('expanded');
            images[i].classList.remove('compressed');
            images[i].classList.remove('bg-contain');
            me.setCss3Style(images[i], 'background-position', 'center');

            if (image) {
                if (image === images[i])
                    continue;

                images[i].classList.add('compressed');
            }
        }
    };

    TomGallery.prototype.onTransitionEnd = function(evt) {
        if (!(evt.target && evt.target.classList.contains('expanded')))
            return;

        if (!(this.options.fullScreen == 'contain'))
            return;

        evt.target.classList.add('bg-contain');
    };

    TomGallery.prototype.onClick = function(evt) {
        if (!evt.target)
            return;

        if (evt.target.classList.contains('image')) {
            if (evt.target.classList.contains('expanded')) {
                this.compressImages();
                this.currentSelection.element = null;
                return;
            } else {
                this.currentSelection.element = evt.target;
                this.compressImages(evt.target);
                evt.target.classList.add('expanded');
            }
        }
    };

    TomGallery.prototype.onMouseMove = function(evt) {
        if (!(evt.target && evt.target.classList.contains('expanded')))
            return;

        var me = this,
            sensivity = me.options.sensivity,
            elementPB = evt.target.getBoundingClientRect(),
            x = 50 + sensivity.x * (((evt.pageX - elementPB.left) / elementPB.width) - 0.5),
            y = 50 + sensivity.y * (((evt.pageY - elementPB.top) / elementPB.height) - 0.5);

        me.currentSelection.targetPos.x = x;
        me.currentSelection.targetPos.y = y;
    };

    TomGallery.prototype.destroy = function() {
        var me = this;

        window.clearInterval(me.$timer);
        me.removeEvents();
        me.emptyGallery();
    };

    var TomBoyGal = new TomGallery(document.querySelector('.tom_gallery'), {
        images: [
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/8604831.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/4747958_orig.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/1437487_orig.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/7974211_orig.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/3248478_orig.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/5867854_orig.jpg',
            'http://www.tcjaket.com/uploads/2/4/2/4/24245065/2952978_orig.jpg',
            'https://mir-s3-cdn-cf.behance.net/project_modules/hd/1e8f4931765563.565f62d7c563a.jpg',
            'http://static.comicvine.com/uploads/original/13/133919/3508169-sarah_kerrigan___hots_12_by_erenor-d5y0142.jpg'
        ],
        fullScreen: 'contain',
        sensivity: {
            x: 300,
            y: 300
        },
    });

    window['TBG'] = TomGallery;
    window['TBGInstance'] = TomBoyGal;
})();
