
window.addEventListener("resize", OnResize);
window.addEventListener("DOMContentLoaded", Init);

var gRenderer;
var gCamera;
var gBoxes =[];
const gCamViewSize =20;

//Resize
function OnResize()
{
    const width =window.innerWidth;
    const height =window.innerHeight;
    const aspect =width / height;
    const camWidth =gCamViewSize * aspect;
    const camHeight =gCamViewSize;

    gRenderer.setPixelRatio(window.devicePixelRatio);
    gRenderer.setSize(width, height);

    gCamera.left =-camWidth;
    gCamera.right =camWidth;
    gCamera.top =camHeight;
    gCamera.bottom =-camHeight;
    gCamera.updateProjectionMatrix();
}

//Initialize
function Init()
{
    //Define viewport.
    const width =window.innerWidth;
    const height =window.innerHeight;
    const aspect = width / height;
    //Define box data.
    const boxSize =5;
    const boxSizeHalf =boxSize / 2;
    const boxOffsetY =boxSizeHalf;
    const boxOffsetZ =-90;
    const r =boxSize * Math.sqrt(2) / 2;

    //Create Three.js renderer.
    gRenderer =new THREE.WebGLRenderer({
        canvas: document.querySelector("#k-mainVitualAnim"),
        antialias: true
    });
    gRenderer.setClearColor(0xffffff, 1);
    gRenderer.setPixelRatio(window.devicePixelRatio);
    gRenderer.setSize(width, height);

    //Create scene.
    const scene =new THREE.Scene();

    //Create camera.
    const camWidth =gCamViewSize * aspect;
    const camHeight =gCamViewSize;
    gCamera =new THREE.OrthographicCamera(-camWidth, camWidth, camHeight, -camHeight, 0.1, 1000);
    const camDist =40;
    const camX =45 * Math.PI / 180;
    const camY =90 * Math.PI / 180;
    gCamera.position.set(-500, 300, 400);
    gCamera.up.set(0, 1, 0);
    gCamera.lookAt(0, 0, 0);

    //Create boxes.
    const groupBoxNum =20;
    const boxSpace =boxSize * 2;

    function CreateBoxRow()
    {
        var boxesGeo =new THREE.Geometry();
        var boxPosition =-groupBoxNum * 2;

        for(let iX = 0; iX < groupBoxNum; iX++)
        {
            const boxGeometry =new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const box =new THREE.Mesh(boxGeometry);

            box.position.set(boxPosition, 0, 0);
            boxPosition +=boxSpace;

            boxesGeo.mergeMesh(box);
        }

        const boxesMaterial =new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0
        });
        const boxesMesh =new THREE.Mesh(boxesGeo, boxesMaterial);
        boxesMesh.receiveShadow =true;
        boxesMesh.castShadow =true;
        boxesMesh.position.set(0, boxSize / 2, boxOffsetZ);
        scene.add(boxesMesh);

        gBoxes.push(boxesMesh);

        //Regist Tween.js
        var boxRow =gBoxes[gBoxes.length - 1];
        var offsetPos =boxRow.position.clone();
        var offsetRot =boxRow.rotation.x;
        var moveOffset =boxSize;
        var fromParam ={t: 0};
        var toParam ={t: 1};
        var duration =500;

        var tween =new TWEEN.Tween(fromParam)
            .to(toParam, duration)
            .repeat(Infinity)
            .onUpdate(({t}) => {
                var centerAngle =Math.PI / 4 + (Math.PI / 2 * t);
                var currentY =Math.sin(centerAngle) * r -boxOffsetY;
                var currentZ =(boxSizeHalf - Math.cos(centerAngle) * r);

                boxRow.position.z =offsetPos.z + currentZ;
                boxRow.position.y =offsetPos.y + currentY;
                var rotaAngle =(Math.PI / 2) * t;
                boxRow.rotation.x =offsetRot + rotaAngle;
                if(t == 1)
                {
                    offsetPos =boxRow.position.clone();
                    offsetRot =boxRow.rotation.x;
                }
            })
            .start();
    }

    //Create directional light.
    const directional =new THREE.DirectionalLight(0xfffffff);
    directional.intensity =1.5;
    directional.position.set(-100, 150, 120).normalize();
    directional.castShadow =true;
    scene.add(directional);

    //First execute.
    CreateBoxRow();
    setInterval(CreateBoxRow, 1500);
    Tick();

    //Tick callback function.
    function Tick()
    {
        //Set callback loop.
        requestAnimationFrame(Tick);

        TWEEN.update();

        //Boxes
        var hasRemoved =false;
        for(let boxRow of gBoxes)
        {
            if(-boxOffsetZ + 50 < boxRow.position.z)
            {
                scene.remove(boxRow);
                hasRemoved =true;
            }
        }
        if(hasRemoved)
        {
            gBoxes.shift();
        }

        gCamera.lookAt(scene.position);

        //Execute rendering.
        gRenderer.render(scene, gCamera);
    }
}