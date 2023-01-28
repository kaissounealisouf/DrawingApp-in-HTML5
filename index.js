
        let draw_color = 'black';
        let draw_width = '2';
        let line_cap = 'round';
        let is_drawing = false;
        let tool_select = 'pencil';
        let restore_array = [];
        let index = -1;
 
        window.open = () => {
            document.getElementById('palette').style.display = 'none';
        };
        const canvas = document.querySelector('#canvas');
        const Tc3 = canvas.width = window.innerWidth - 110;
        const Btch_B = canvas.height = window.innerHeight - 50;
        let mu = canvas.getContext('2d');
        let start_background_color = 'white';
        mu.fillStyle = start_background_color;
        mu.fillRect(0, 0, Tc3.width, Btch_B.height);
 
        noble_cropsDrawingFormula();
 
        function noble_cropsDrawingFormula() {
            canvas.addEventListener('touchstart', start, false);
            canvas.addEventListener('mousedown', start, false);
            canvas.addEventListener('pointerdown', start, false);
 
            canvas.addEventListener('touchmove', draw, false);
            canvas.addEventListener('mousemove', draw, false);
            canvas.addEventListener('pointermove', draw, false);
 
 
            canvas.addEventListener('touchend', stop, false);
            canvas.addEventListener('mouseup', stop, false);
            canvas.addEventListener('mouseout', stop, false);
            canvas.addEventListener('pointerup', stop, false);
            canvas.addEventListener('pointercancel', stop, false);
        }
 
        function corAtual(e) {
 
            draw_color = e;
 
            document.getElementById('cor_atual').style.background = draw_color;
 
            var palette = document.getElementById('palette');
 
            if (palette.style.display == 'block') {
 
                palette.style.display = 'none';
 
            } else {
 
                palette.style.display = 'block';
 
            }
 
        }
 
        const change_color = element => {
 
            draw_color = element.style.background;
 
            document.getElementById('cor_atual').style.background = draw_color;
        }
 
 
        function start(event) {
 
 
 
            document.getElementById('size').style.display = 'none';
            document.getElementById('palette').style.display = 'none';
 
 
            is_drawing = true;
 
            mu.beginPath();
            mu.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
 
 
 
            mux = event.clientX - canvas.offsetLeft;
            muy = event.clientY - canvas.offsetTop;
 
            event.preventDefault();
 
        }
 
        const tools = function (e) {
 
            tool_select = e;
 
            document.querySelector('#pencil').style.background = 'none';
            document.querySelector('#pencil').style.filter = 'none';
            document.querySelector('#Erase').style.filter = 'none';
            document.querySelector('#Erase').style.borderRadius = '0';
            document.querySelector('#lin').style.background = 'none';
            document.querySelector('#lin').style.filter = 'none';
            document.querySelector('#lin').style.borderRadius = '0';
            document.getElementById(e).style.borderRadius = '30px';
 
        }
 
 
        function draw(event) {
 
            if (is_drawing) {
                if (tool_select == 'pencil') {
                    mu.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
                    mu.globalCompositeOperation = "source-over";
                    mu.strokeStyle = draw_color;
                    mu.lineWidth = draw_width;
                    mu.lineCap = line_cap;
                    mu.lineJoin = line_cap;
                    mu.stroke();
 
                }
 
                if (tool_select == 'Erase') {
 
                    mu.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
 
                    mu.globalCompositeOperation = "destination-out";
 
                    mu.lineWidth = draw_width;
 
                    mu.lineCap = line_cap;
 
                    mu.lineJoin = line_cap;
 
                    mu.stroke();
                }
 
 
                if (tool_select == 'lin') {
 
                    mu.putImageData(restore_array[index], 0, 0);
                    mu.globalCompositeOperation = "source-over";
                    mu.strokeStyle = draw_color;
                    mu.lineWidth = draw_width;
                    mu.beginPath();
                    mu.moveTo(mux, muy);
                    mu.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
                    mu.stroke();
                }
 
            }
 
            event.preventDefault();
        }
 
        function stop(event) {
 
            if (is_drawing) {
 
                mu.stroke();
                mu.closePath();
                is_drawing = false;
 
            }
            event.preventDefault();
 
 
            if (event.type != 'mouseout') {
                restore_array.push(mu.getImageData(0, 0, Tc3, Btch_B));
                index += 1;
            }
        }
        const clear_canvas = () => {
            mu.fillStyle = start_background_color;
            mu.clearRect(0, 0, Tc3, Btch_B);
            mu.fillRect(0, 0, Tc3, Btch_B);
            restore_array = [];
            index = -1;
 
        }
        const undo = function () {
            if (index <= 0) {
                clear_canvas();
            } else {
                index -= 1;
                restore_array.pop();
                mu.putImageData(restore_array[index], 0, 0);
            }
        }
        document.addEventListener('keydown', function (event) {
 
            if (event.ctrlKey && event.key === 'z') {
                undo();
            }
 
        });
 
        const palette = function () {
            let palette = document.getElementById('palette');
            if (palette.style.display == 'none') {
                palette.style.display = 'block';
            } else {
                palette.style.display = 'none';
            }
        }
        let ranged = document.querySelector('#pen_range');
        ranged.addEventListener('input', function changed() {
            let ranged = document.querySelector('#pen_range').value;
            let rangedText = document.querySelector('#text_range');
            rangedText.innerText = ranged + "px";
        }, false);
 
 
        const width = e => {
            draw_width = e;
            let ranged = document.querySelector('#pen_range');
            let rangedText = document.querySelector('#text_range');
            rangedText.innerText = e + "px";
            ranged.value = e;
            let Style = document.querySelector('#size');
            const newLocal = 'none';
            Style.style.display = newLocal;
 
        }
        const sizeOption = function () {
            let ifNobleRespectedUser_getsSizedUp = document.querySelector('#size');
            if (ifNobleRespectedUser_getsSizedUp.style.display == 'block') {
                ifNobleRespectedUser_getsSizedUp.style.display = 'none';
            } else {
                ifNobleRespectedUser_getsSizedUp.style.display = 'block';
            }
 
        }
 
        const formatOption = () => {
            let fileSave = document.querySelector('#formatOption');
            if (fileSave.style.display == 'none') {
                fileSave.style.display = 'block';
            } else {
                fileSave.style.display = 'none';
            }
        }
 
        const save = () => {
            let IfSheSelectesTheFile = document.querySelector('#Selected').value;
            let format = document.querySelector('#format').value;
            let canvas = document.querySelector('#canvas');
            let image = canvas.toDataURL("image/" + format + "", 1.0).replace("image/" + format + "", "image/octet-stream");
            //Please review mdn  documentation toDataUrl to choose your format img or pdf
            let workDoneByNobleuser = document.createElement('a');
            workDoneByNobleuser.download = "" + IfSheSelectesTheFile + "";
            workDoneByNobleuser.href = image;
            workDoneByNobleuser.click();
 
        }
 
 
    