# tomGallery


### download release and add into your project the following:
##### in head:
```html
<link rel="stylesheet" src="tomGallery.css" />
```
##### in body:
```html
<div class="tom_gallery"></div>
<script src="tomGallery.js"></script>
```
## how to use:

```javascript
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
        sensivity: {
            x: 300,
            y: 300
        }
    });
```
##### sensivity:
defines the gliding across an opened image ( since is original size)
##### images:
is an array of URLs that are pointing to your images
#####: to contain the images instead of the mouse tracking one:
add the following along sensivity and images:
```javascript
fullScreen: 'contain',
fullScreenDelay: 1000 //one second in milliseconds ( if you change css do the same accordingly here)
```
