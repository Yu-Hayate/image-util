namespace SpriteKind {
    export const Temporary = SpriteKind.create()
}
let bgX = 0
let bgY = 0
let ID496D61676532 = image.create(0, 0)
let ID54656D704E756D3220 = 0
enum DegréesToRotate {
    clockwise = 1,
    counterclockwise = 2,
    dubbleClockwise = 3
}
enum Size {
    Whith = 1,
    Hight = 2
}
function _1DPixelValue121(X: number, Img: Image) {
    return (Img.getPixel(X + 1, 0) + (Img.getPixel(X - 1, 0) + Img.getPixel(X, 0))) / 3
}
function ID506978656C56616C7565(X: number, Y: number, Image2: Image) {
    return (Image2.getPixel(X + 1, Y) + Image2.getPixel(X - 1, Y) + (Image2.getPixel(X, Y + 1) + Image2.getPixel(X, Y - 1)) + (Image2.getPixel(X + 1, Y + 1) + Image2.getPixel(X + 1, Y - 1) + (Image2.getPixel(X - 1, Y + 1) + Image2.getPixel(X - 1, Y - 1)))) / 8
}
/**
 * Image Editor
 */
//% weight=49 color=#f1992b icon="\uf03e"
namespace Image_Editor {
    /**
     * TODO: describe your function here, draw myImage onto myImage2
     * @param myImage describe parameter here,
     * @param myImage2 describe parameter here,
     */
    //% block="draw $myImage onto $myImage2"
    //% myImage.shadow=screen_image_picker
    //% myImage2.shadow=screen_image_picker
    export function Print(myImage: Image, myImage2: Image): Image {
        let TempImg = myImage2.clone()
        for (let X = 0; X <= TempImg.width; X++) {
            for (let Y = 0; Y <= TempImg.height; Y++) {
                if (myImage.getPixel(X, Y) != 0) {
                    myImage2.setPixel(X, Y, myImage.getPixel(X, Y))
                }
            }
        }
        return myImage2
    }
    //% block="1D Noise Image Witht $W Thicness $Thicness"
    //% W.defl=160
    //% Thicness.defl=2
    export function CreateNoiseImage1D(W: number, Thicness: number) {
        ID496D61676532 = image.create(W, 1)
        for (let X = 0; X <= W; X++) {
            ID496D61676532.setPixel(X, 0, randint(3, 15))
        }
        for (let i = 0; i < Thicness; i++) {
            for (let X2 = 0; X2 <= W; X2++) {
                ID496D61676532.setPixel(X2, 0, _1DPixelValue121(X2, ID496D61676532))
            }
        }
        return ID496D61676532
    }

    /**
     * TODO: describe your function here, makes perline noise from en image
     * @param Image2 describe parameter here, the image to Create prerline noise
     * @param BlendingLevel describe parameter here, the Blending Level
     */
    //% block="2D Noise Image Witht $W Height $H Thicness $BlendingLevel"
    //% BlendingLevel.defl=3
    //% W.defl=160
    //% H.defl=120
    //% BlendingLevel.number
    export function CreateNoiseImage2D(W: number, H: number, BlendingLevel: number) {
        let Image2 = image.create(W, H)
        for (let X = 0; X <= Image2.width; X++) {
            for (let Y = 0; Y <= Image2.height; Y++) {
                if (X == 0 || Y == 0 || X == Image2.width - 1 || Y == Image2.height - 1) {
                    Image2.setPixel(X, Y, randint(12, 16))
                } else {
                    Image2.setPixel(X, Y, randint(3, 15))
                }
            }
        }
        for (let Times = 0; Times <= 1; Times++) {
            for (let X2 = 0; X2 <= Image2.width; X2++) {
                Image2.setPixel(X2, Times * (Image2.height - 1), ID506978656C56616C7565(X2, Times * (Image2.height - 1), Image2) + 1)
            }
            for (let Y2 = 0; Y2 <= Image2.height; Y2++) {
                Image2.setPixel(Times * (Image2.width - 1), Y2, ID506978656C56616C7565(Times * (Image2.width - 1), Y2, Image2) + 1)
            }
        }
        for (let Times = 0; Times < BlendingLevel; Times++) {
            for (let X2 = 0; X2 <= Image2.width - 3; X2++) {
                for (let Y2 = 0; Y2 <= Image2.height - 3; Y2++) {
                    Image2.setPixel(X2 + 1, Y2 + 1, ID506978656C56616C7565(X2 + 1, Y2 + 1, Image2))
                }
            }
        }

        return Image2
    }
    /**
     * TODO: describe your function here, rotate any square image
     * @param myImage describe parameter here, the image you want to rotate
    * @param Rotate describe parameter here, rotate it clockwise or counterclockwise
     */
    //% block="Rotate $myImage 90° $Rotate"
    //% myImage.shadow=screen_image_picker
    //% Rotate.enum

    export function Rotate(myImage: Image, Rotate: DegréesToRotate): Image {
        let TempImg = image.create(myImage.width, myImage.height)
        if (Rotate == 1) {
            for (let X1 = 0; X1 <= TempImg.width; X1++) {
                for (let Y1 = 0; Y1 <= TempImg.height; Y1++) {
                    TempImg.setPixel(X1, Y1, myImage.getPixel(myImage.height - Y1, X1))
                }
            }
        } else if (Rotate == 2) {
            for (let X2 = 0; X2 <= TempImg.width; X2++) {
                for (let Y2 = 0; Y2 <= TempImg.height; Y2++) {
                    TempImg.setPixel(X2, Y2, myImage.getPixel(Y2, myImage.width - X2))
                }
            }
        } else {
            myImage.flipX()
            myImage.flipY()
        }
        return TempImg
    }

    /**
     * TODO: describe your function here, find the width or the height of en image
     * @param image describe parameter here, the image you want to find the width or the height
    * @param size describe parameter here, Choose if you want to know the width or the height
     */
    //% block="$size of $MyImage "
    //% MyImage.shadow=screen_image_picker
    //% size.Size
    // come back to this one 
    export function FindSizeOf(size: Size, MyImage: Image): number {
        if (size == 1) {
            return MyImage.width
        } else {
            return MyImage.height
        }
    }
    /**
     * TODO: describe your function here, maks a grid with your image
     * @param image describe parameter here, The image you want to make a grid of
     * @param Xtimes describe parameter here, the amont of times to place your image on the X axes
     * @param Ytimes describe parameter here, the amont of times to place your image on the Y axes
     */
    //% block="Grid of $imagE size x $Xtimes y $Ytimes"
    //% imagE.shadow=screen_image_picker
    //% Xtimes.Number
    //% Ytimes.Number
    export function MakeGrid(imagE: Image, Xtimes: number, Ytimes: number): Image {
        let TempImg = image.create(imagE.width * Xtimes, imagE.height * Ytimes)
        for (let X = 0; X <= imagE.width * Xtimes; X++) {
            for (let Y = 0; Y <= imagE.height * Ytimes; Y++) {

                TempImg.setPixel(X, Y, imagE.getPixel(X % imagE.width, Y % imagE.height))
            }
        }
        return TempImg
    }
    //% block="Draw $background onto $foreground x$offsetX y$offsetY"
    //% background.shadow=screen_image_picker
    //% foreground.shadow=screen_image_picker
    //% foreground.width.defl=160
    //% foreground.height.defl=120
    //% offsetX.number
    //% offsetY.number
    export function pasteImage(background: Image, foreground: Image, offsetX: number, offsetY: number) {
        bgY = 0
        bgX = 0
        for (let x = 0; x <= Math.max(background.width, foreground.width) - 1; x++) {
            for (let y = 0; y <= background.height - 1; y++) {
                // Calculate the coordinates in the background image
                bgX = x + offsetX
                bgY = y + offsetY
                // Check if this pixel is inside the bounds of the background image
                if ((!(background.getPixel(bgX, bgY) == 0)) && (bgX >= 0 && bgX < foreground.width && bgY >= 0 && bgY < foreground.height)) {
                    // Set the color of the corresponding pixel in the background image
                    foreground.setPixel(bgX, bgY, background.getPixel(x, y))
                }
            }
        }
        return foreground
    }
}