window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    };

    function startGame() {
        myGameArea.start();


    }

    function updateGameArea() {

        background.move();
        background.draw();
        boy.draw();


    }

    const myGameArea = {
        canvas: document.querySelector('#quadro'),
        estudo: 0, 
        jobcash: 0, 
        start: function () {
            this.context = this.canvas.getContext('2d');
            this.canvas.width = 800;
            this.canvas.height = 500;
            background.draw();
            setInterval(updateGameArea, 100)
        },


        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }


    }
    // BackGround

    class ScrollingBackground {
        constructor(source) {
            this.img = new Image();
            this.img.src = source;
            this.x = 0;
            this.y = 0;
            this.speed = -7;
        }
        move() {
            this.x += this.speed;
            this.x %= myGameArea.canvas.width;
        }
        draw() {
            myGameArea.context.drawImage(this.img, this.x, this.y);
            if (this.speed < 0) {
                myGameArea.context.drawImage(this.img, this.x + this.img.width, 0);
            } else {
                myGameArea.context.drawImage(this.img, this.x - this.img.width, 0);
            }
        }
    }
    const background = new ScrollingBackground('/images_mdm/back.png')

    // Menino do morro

    class Menino {
        constructor(source, width, height) {
            this.img = new Image();
            this.img.src = source;
            this.x = 50;
            this.y = 300;
            this.width = width;
            this.height = height;
            this.speed = 10
        }
        draw() {
            myGameArea.context.drawImage(this.img, this.x, this.y, this.width, this.height);

        }

        moveRight() {
            if (this.x < myGameArea.canvas.width - this.width) {
                this.x += this.speed;
            }

        }
        moveLeft() {
            if (this.x > 0) {
                this.x -= this.speed;
            }

        }
        moveUp() {
            if (this.y > 110) {
                this.y -= this.speed;
            }

        }
        moveDown() {
            if (this.y < 390) {
                this.y += this.speed;
            }

        }
    }


    const boy = new Menino('images_mdm/menino.png', 70, 80)


    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 38: // up arrow
                boy.moveUp();
                break;
            case 40: // down arrow
                boy.moveDown();
                break;
            case 37: // left arrow
                boy.moveLeft();
                break;
            case 39: // right arrow
                boy.moveRight();
                break;
        }
    });

};


