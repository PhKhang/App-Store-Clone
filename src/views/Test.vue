<template>
    <div class="app-info">
        <img :src="app.icon_url" alt="" referrerpolicy="no-referrer">
        <h1>{{ app.name }}</h1>


        <div class="info" style="padding-top: 40px;">
            <h2>Payment invoice:</h2>
            <p>{{ app.price }}₫</p>
        </div>

        <div class="info">
            <h2>For:</h2>
            <p>{{ user.username }}</p>
        </div>

        <div class="info">
            <h2>Pay with:</h2>
        </div>

    </div>

    <div class="payment app-info">
        <!-- Set up a container element for the button -->
        <div id="paypal-button-container"></div>

        <div class="sep">
            <div class="line"></div>
            <div class="or">or</div>
        </div>

        <div class="scanner">
            <div class="card">
                <h3 class="brand">{{ so }}</h3>

                <p class="number">{{ cardNumber }}</p>
                <h3 class="name">{{ owner }}</h3>
            </div>

            <form action="" @submit.prevent="buy()">
                <input id="cardNumber" type="text" v-model="cardNumber" placeholder="Card number">
                <input id="owner" type="text" v-model="owner" placeholder="Owner's name">
                <input id="expiryMonth" type="text" v-model="expiryMonth" placeholder="Expiration">
                <input id="expiryYear" type="text" v-model="expiryYear" placeholder="Expiration">
                <input id="cvv" type="text" v-model="cvv" placeholder="CVV">
                <button type="submit">
                    Confirm
                </button>
            </form>




            <div id="screen-initial">
                <h1 id="msg">Loading...</h1>
                <progress id="load-progress" value="0" max="100"></progress>
            </div>
            <div id="screen-start" class="hidden">
                <a href="#" id="start-scan">Start scan</a>
            </div>
            <div id="screen-scanning" class="hidden">
                <video id="camera-feed" playsinline></video>
                <!-- Recognition events will be drawn here. -->
                <canvas id="camera-feedback"></canvas>
                <p id="camera-guides">
                    Point the camera towards Payment cards
                </p>
            </div>
        </div>
    </div>



</template>

<script>
import { supabase } from '../supabase'

paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.01' // Can also reference a variable or function
                }
            }]
        });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
        return actions.order.capture().then(function (orderData) {
            // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];
            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            // When ready to go live, remove the alert and show a success message within this page. For example:
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
        });
    }
}).render('#paypal-button-container');

var so = "348357"

function yell() {
    $options.methods.yell()
}

export default {
    name: 'test',
    components: {
    },
    data() {
        return {
            app: '',
            user: '',
            cardNumber: '',
            owner: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            brand: ''
        }
    },
    methods: {
        async match(id) {
            const { data: matchid, error } = await supabase
                .from('Apps')
                .select("*")
                .eq("id", id)

            this.app = matchid[0]
            console.log(matchid)

        },

        async doSomething() {
            const { data, error } = await supabase
                .from('Apps')
                .select()
                .contains('category', ['Ngoại tuyến'])

            console.log(data)
        },

        async load() {
            // console.log(this.data, 'ihgihgih')
            const { data: { user } } = await supabase.auth.getUser();

            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)

            this.user = profile[0]
        },

        async scanner() {
            /**
    * BlinkCard In-browser SDK demo app which demonstrates how to:
    *
    * - Change default SDK settings
    * - Scan Payment cards
    * - Provide visual feedback to the end-user during the scan
    */

            // General UI helpers
            const initialMessageEl = document.getElementById("msg");
            const progressEl = document.getElementById("load-progress");

            // UI elements for scanning feedback
            const cameraFeed = document.getElementById("camera-feed");
            const cameraFeedback = document.getElementById("camera-feedback");
            const drawContext = cameraFeedback.getContext("2d");
            const scanFeedback = document.getElementById("camera-guides");
            var blinkCardResult = null;

            /**
                 * Initialize and load WASM SDK.
                 */
            async function main() {
                // Check if browser has proper support for WebAssembly
                if (!BlinkCardSDK.isBrowserSupported()) {
                    initialMessageEl.innerText = "This browser is not supported!";
                    return;
                }

                // 1. You can request a free trial license key, after you register, at Microblink Developer Hub
                const licenseKey = "sRwAAAYSYXBwaG9tZS52ZXJjZWwuYXBwCLR9UrTq7zFOMct8bjje/5ODCxSUEJyeKoHnByvlfMIjS0zqBShGGKID/NTApyCNwmf1NfyXNrg9crjNBfZ4fMjp5Yle4gbl4nB9da4nhRwj/69wBL9x8FyzJYKMzr3ud9gv2t7szsF+QLpVBfnveOKFx2nGuzSPwUss1kJm95ZxHymDZI7mWKQ=";

                // 2. Create instance of SDK load settings with your license key
                const loadSettings = new BlinkCardSDK.WasmSDKLoadSettings(licenseKey);

                // [OPTIONAL] Change default settings

                // Show or hide hello message in browser console when WASM is successfully loaded
                loadSettings.allowHelloMessage = true;

                // In order to provide better UX, display progress bar while loading the SDK
                loadSettings.loadProgressCallback = (progress) => (progressEl.value = progress);

                // Set absolute location of the engine, i.e. WASM and support JS files
                loadSettings.engineLocation = "https://unpkg.com/@microblink/blinkcard-in-browser-sdk@2.6.1/resources/";

                // Set absolute location of the worker file
                // IMPORTANT: function getWorkerLocation is a workaround for the CodePen since native Web Workers are not supported
                loadSettings.workerLocation = await getWorkerLocation('https://unpkg.com/@microblink/blinkcard-in-browser-sdk@2.6.1/resources/BlinkCardWasmSDK.worker.min.js');

                // 3. Load SDK
                BlinkCardSDK.loadWasmModule(loadSettings).then
                    (
                        sdk => {
                            document.getElementById("screen-initial")?.classList.add("hidden");
                            document.getElementById("screen-start")?.classList.remove("hidden");
                            document.getElementById("start-scan")?.addEventListener("click", (ev) => {
                                ev.preventDefault();
                                startScan(sdk);
                            });
                        },
                        error => {
                            initialMessageEl.innerText = "Failed to load SDK!";
                            console.error("Failed to load SDK!", error);
                        }
                    );

            }

            /**
                 * Scan payment card.
                 */
            async function startScan(sdk) {
                document.getElementById("screen-start")?.classList.add("hidden");
                document.getElementById("screen-scanning")?.classList.remove("hidden");

                // 1. Create a recognizer objects which will be used to recognize single image or stream of images.
                //
                // In this example, we create a BlinkCardRecognizer, which knows how to scan Payment cards
                // and extract payment information from them.
                const blinkCardRecognizer = await BlinkCardSDK.createBlinkCardRecognizer(sdk);

                // [OPTIONAL] Create a callbacks object that will receive recognition events, such as detected object location etc.
                const callbacks = {
                    onQuadDetection: quad => drawQuad(quad),
                    onFirstSideResult: () => alert("Flip the document")
                }

                // 2. Create a RecognizerRunner object which orchestrates the recognition with one or more
                //    recognizer objects.
                const recognizerRunner = await BlinkCardSDK.createRecognizerRunner
                    (
                        // SDK instance to use
                        sdk,
                        // List of recognizer objects that will be associated with created RecognizerRunner object
                        [blinkCardRecognizer],
                        // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
                        false,
                        // [OPTIONAL] Callbacks object that will receive recognition events
                        callbacks
                    );

                // 3. Create a VideoRecognizer object and attach it to HTMLVideoElement that will be used for displaying the camera feed
                const videoRecognizer = await BlinkCardSDK.VideoRecognizer.createVideoRecognizerFromCameraStream
                    (
                        cameraFeed,
                        recognizerRunner
                    );

                // 4. Start the recognition and await for the results
                const processResult = await videoRecognizer.recognize();

                // 5. If recognition was successful, obtain the result and display it
                if (processResult !== BlinkCardSDK.RecognizerResultState.Empty) {
                    blinkCardResult = await blinkCardRecognizer.getResult();
                    if (blinkCardResult.state !== BlinkCardSDK.RecognizerResultState.Empty) {
                        console.log("BlinkCard results", blinkCardResult);

                        const firstAndLastName = blinkCardResult.owner;
                        const cardNumber = blinkCardResult.cardNumber;
                        const dateOfExpiry = {
                            year: blinkCardResult.expiryDate.year,
                            month: blinkCardResult.expiryDate.month
                        }

                        document.getElementById("cardNumber").value = blinkCardResult.cardNumber;
                        document.getElementById("owner").value = blinkCardResult.owner;
                        document.getElementById("expiryMonth").value = blinkCardResult.expiryDate.month;
                        document.getElementById("expiryYear").value = blinkCardResult.expiryDate.year;
                        document.getElementById("cvv").value = blinkCardResult.cvv;

                        alert
                            (
                                `Hello, ${firstAndLastName}!\n Your payment card with card number ${cardNumber} will expire on ${dateOfExpiry.year}/${dateOfExpiry.month}.`
                            );
                    }
                }
                else {
                    alert("Could not extract information!");
                }

                // 7. Release all resources allocated on the WebAssembly heap and associated with camera stream

                // Release browser resources associated with the camera stream
                videoRecognizer?.releaseVideoFeed();

                // Release memory on WebAssembly heap used by the RecognizerRunner
                recognizerRunner?.delete();

                // Release memory on WebAssembly heap used by the recognizer
                blinkCardRecognizer?.delete();

                // Clear any leftovers drawn to canvas
                clearDrawCanvas();

                // Hide scanning screen and show scan button again
                document.getElementById("screen-start")?.classList.remove("hidden");
                document.getElementById("screen-scanning")?.classList.add("hidden");
            }

            /**
                 * Utility functions for drawing detected quadrilateral onto canvas.
                 */
            function drawQuad(quad) {
                clearDrawCanvas();

                // Based on detection status, show appropriate color and message
                setupColor(quad);

                applyTransform(quad.transformMatrix);
                drawContext.beginPath();
                drawContext.moveTo(quad.topLeft.x, quad.topLeft.y);
                drawContext.lineTo(quad.topRight.x, quad.topRight.y);
                drawContext.lineTo(quad.bottomRight.x, quad.bottomRight.y);
                drawContext.lineTo(quad.bottomLeft.x, quad.bottomLeft.y);
                drawContext.closePath();
                drawContext.stroke();
            }

            /**
                 * This function will make sure that coordinate system associated with detectionResult
                 * canvas will match the coordinate system of the image being recognized.
                 */
            function applyTransform(transformMatrix) {
                const canvasAR = cameraFeedback.width / cameraFeedback.height;
                const videoAR = cameraFeed.videoWidth / cameraFeed.videoHeight;

                let xOffset = 0;
                let yOffset = 0;
                let scaledVideoHeight = 0
                let scaledVideoWidth = 0

                if (canvasAR > videoAR) {
                    // pillarboxing: https://en.wikipedia.org/wiki/Pillarbox
                    scaledVideoHeight = cameraFeedback.height;
                    scaledVideoWidth = videoAR * scaledVideoHeight;
                    xOffset = (cameraFeedback.width - scaledVideoWidth) / 2.0;
                }
                else {
                    // letterboxing: https://en.wikipedia.org/wiki/Letterboxing_(filming)
                    scaledVideoWidth = cameraFeedback.width;
                    scaledVideoHeight = scaledVideoWidth / videoAR;
                    yOffset = (cameraFeedback.height - scaledVideoHeight) / 2.0;
                }

                // first transform canvas for offset of video preview within the HTML video element (i.e. correct letterboxing or pillarboxing)
                drawContext.translate(xOffset, yOffset);
                // second, scale the canvas to fit the scaled video
                drawContext.scale
                    (
                        scaledVideoWidth / cameraFeed.videoWidth,
                        scaledVideoHeight / cameraFeed.videoHeight
                    );

                // finally, apply transformation from image coordinate system to
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
                drawContext.transform
                    (
                        transformMatrix[0],
                        transformMatrix[3],
                        transformMatrix[1],
                        transformMatrix[4],
                        transformMatrix[2],
                        transformMatrix[5]
                    );
            }

            function clearDrawCanvas() {
                cameraFeedback.width = cameraFeedback.clientWidth;
                cameraFeedback.height = cameraFeedback.clientHeight;

                drawContext.clearRect
                    (
                        0,
                        0,
                        cameraFeedback.width,
                        cameraFeedback.height
                    );
            }

            function setupColor(displayable) {
                let color = "#FFFF00FF";

                if (displayable.detectionStatus === 0) {
                    color = "#FF0000FF";
                }
                else if (displayable.detectionStatus === 1) {
                    color = "#00FF00FF";
                }

                drawContext.fillStyle = color;
                drawContext.strokeStyle = color;
                drawContext.lineWidth = 5;
            }

            function getWorkerLocation(path) {
                return new Promise((resolve) => {
                    window.fetch(path)
                        .then(response => response.text())
                        .then(data => {
                            const blob = new Blob([data], { type: "application/javascript" });
                            const url = URL.createObjectURL(blob);
                            resolve(url);
                        });
                });
            }

            // Run
            main();


        },
        yell() {
            console.log("hi")
        },

        test() {
            var a = "546598656562626464"
            console.log("test")

            function test() {
                console.log("why")
                so = "39485758058"
            }


            test();

            console.log(so, "whiwghiwhiughriuhirhuhgi")
        },

        async buy() {
            // console.log(this.data, 'ihgihgih')
            console.log("clickex         jgihgihgihighi")
            const { data: { user } } = await supabase.auth.getUser();

            if (user == null) {
                return
            }

            let { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)


            var bought
            if (profile[0].bought == null) {
                bought = [];
            }
            else {
                bought = profile[0].bought;
            }
            console.log(bought, 'all bought games')
            bought.push(this.app.id)
            console.log(bought, 'after update')


            let { data: Profiles, error } = await supabase
                .from('profiles')
                .update([
                    {
                        bought: bought
                    }
                ])
                .eq("id", user.id)


            console.log(profile, 'this is the user profile')
        },

        async updateInfo() {
            this.edit = false
            let { data: Profiles, error } = await supabase
                .from('profiles')
                .update([
                    {
                        username: this.name,
                        bio: this.bio,
                        fb: this.fb,
                        ig: this.ig,
                        twt: this.twt,
                    }
                ])
                .eq("id", this.id)
            this.load()
        },

    },
    mounted() {
        this.match(this.$route.params.id);
        this.load();


        this.test();

        // yell()


        this.scanner();

    }
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
}

html {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 24px;
    font-family: sans-serif;
}

body {
    display: flex;
    min-height: 100%;
    margin: 0;
    padding: 1.5rem;
    justify-content: center;
    align-items: center;
}

#screen-initial,
#screen-scanning {
    display: block;
    width: 100%;
    height: 100%;
}

/* Rules for better readability */
img {
    display: block;
    width: 100%;
    max-width: 320px;
    height: auto;
}

video {
    width: 100%;
    height: 100%;
}

textarea {
    display: block;
}

/* Camera feedback */
#screen-scanning {
    position: relative;
}

#camera-feedback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;
}

#camera-guides {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-weight: bold;
}

/* Auxiliary classes */
.hidden {
    display: none !important;
}

.app-info {
    width: 100%;
    max-width: 800px;
    margin: auto;

}

.info {
    width: 100%;
    max-width: 800px;
    height: min-content;
    margin: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &>* {
        margin: 0;
        padding: 0;
    }

}

.payment>* {
    padding: 10px;
}

.payment {
    width: 100%;
    display: grid;
    grid-template-columns: 10fr 1fr 10fr;

    padding: 0;

    .sep {
        display: flex;
        justify-content: center;
        align-items: center;

        .line {
            position: relative;

            width: 0px;
            height: 100%;

            border: 2px #eaeaea solid;
        }

        .or {
            position: absolute;
            color: #BABABA;
            font-weight: 600;
            background-color: white;
        }
    }

}


.card {
    position: relative;

    width: 100%;
    max-width: 600px;
    aspect-ratio: 1.7/1;
    background: linear-gradient(90deg, #DAE6E2 0%, #55F0BC 100%);
    border-radius: 14px;
    padding: 4%;

    .brand {
        position: relative;
        top: 0;
        left: 0;
    }

    .number {
        position: relative;
        bottom: 1ch;
        left: 0;
    }

    .name {
        position: relative;
        bottom: 0;
        left: 0;
    }
}

@media screen and (max-width: 820px) {
    .payment {
        display: flex;
        flex-direction: column;
    }
}
</style>