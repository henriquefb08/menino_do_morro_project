window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
  
    };
    // funnções bases
    function startGame() {
        myGameArea.start();
        audioMusic.play();

    }

    function checkImpact() {
        for (let i = 0; i < myGameArea.myObstacles.length; i += 1) {
            if (boy.crashWith(myGameArea.myObstacles[i])) {
                myGameArea.score += myGameArea[myGameArea.myObstacles[i].type];
                if (myGameArea[myGameArea.myObstacles[i].type] < 0) {
                    coinMusicNegative.play();
                } else {
                    coinMusic.play();
                }
                myGameArea.myObstacles.splice(i, 1);


            }

            if (myGameArea.score > 1 && myGameArea.score < 5) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "17px Arial";
                myGameArea.context.fillText("Boa! Foco nos seus objetivos!", 30, 470);
            }
            if (myGameArea.score > 5 && myGameArea.score < 10) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "16px Arial";
                myGameArea.context.fillText(
                    "Com o tempo você consegue entrar na Faculdade!",
                    30,
                    470
                );
            }

            if (myGameArea.score > 10 && myGameArea.score < 15) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "16px Arial";
                myGameArea.context.fillText(
                    "Cuidado não pense em desistir agora!",
                    30,
                    470
                );
            }
            if (myGameArea.score > 15 && myGameArea.score < 20) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "16px Arial";
                myGameArea.context.fillText(
                    "Você está cansado mas o amanhã será melhor!",
                    30,
                    470
                );
            }
            if (myGameArea.score > 20 && myGameArea.score < 30) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "16px Arial";
                myGameArea.context.fillText(
                    "Você está evoluindo muito, até foi promovido!",
                    30,
                    470
                );
            }
            if (myGameArea.score > 30 && myGameArea.score < 40) {
                myGameArea.context.fillStyle = "black";
                myGameArea.context.font = "16px Arial";
                myGameArea.context.fillText(
                    "Você está ganhando muito conhecimento!",
                    30,
                    470
                );
            }
            if (myGameArea.score <= 0) {
                myGameArea.stop();
                myGameArea.gameOver();
                
            }

        }
    }

    function updateGameArea() {
        myGameArea.clear();
        background.move();
        background.draw();
        myGameArea.frames += 1;
        updateObstacles();
        boy.draw();
        myGameArea.counting();
        checkImpact();


    }

    function updateObstacles() {
        let problem = [
            "criminalidade",
            "desigualdade",
            "preconceito",
            "cash",
            "estudo",
        ];

        if (myGameArea.frames % 50 === 0) {
            let randomProblem = Math.floor(Math.random() * problem.length);
            // console.log(randomProblem)
            let minPos = 110;
            let maxPos = 390;
            let pos = Math.floor(Math.random() * (maxPos - minPos) + minPos);
            myGameArea.myObstacles.push(
                new Obstaculo(problem[randomProblem], 800, pos)
            );
        }

        myGameArea.myObstacles.forEach((pbm) => {
            pbm.move();
            pbm.draw();
            // console.log(pbm.type)
        });
    }
    //to organize here
    const myGameArea = {
        canvas: document.querySelector("#quadro"),
        // pontuações iniciais
        estudo: 2,
        cash: 2,
        desigualdade: -3,
        preconceito: -2,
        criminalidade: -1,
        myObstacles: [],
        frames: 0,
        level: 1,
        score: 1,
        start: function () {
            this.context = this.canvas.getContext("2d");
            this.canvas.width = 800;
            this.canvas.height = 500;
            background.draw();
            this.interval = setInterval(updateGameArea, 100);
        },

        stop: function () {
            clearInterval(this.interval);
            audioMusic.pause();
        },

        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        counting: function () {
            this.context.fillStyle = "#343a40";
            this.context.font = "38px Arial";
            this.context.fillText(`Life: ${this.score}`, 650, 450);
        },

        gameOver: function () {
            myGameArea.clear();
            setTimeout(reload, 10000)
            myGameArea.context.textAlign = "center";
            myGameArea.context.fillStyle = "black";
            myGameArea.context.fillRect(
                0,
                0,
                myGameArea.canvas.width,
                myGameArea.canvas.height
            );
            myGameArea.context.fillStyle = "red";
            myGameArea.context.font = "24px Arial";
            myGameArea.context.fillText(
                "GAME OVER",
                myGameArea.canvas.width / 2,
                (myGameArea.canvas.height * 2) / 10
            );
            myGameArea.context.fillText(
                "Você acabou perdendo sua única chance,",
                myGameArea.canvas.width / 2,
                (myGameArea.canvas.height * 4) / 10
            );
            myGameArea.context.fillText(
                "assim como um jovem de periferia que perde sua vida.",
                myGameArea.canvas.width / 2,
                (myGameArea.canvas.height * 5) / 10
            );
            myGameArea.context.fillText(
                "Por conta da criminalidade, preconceito ou desigualdade..",
                myGameArea.canvas.width / 2,
                (myGameArea.canvas.height * 6) / 10
            );
        },
    };
    // BackGround

    class ScrollingBackground {
        constructor(source) {
            this.img = new Image();
            this.img.src = source;
            this.x = 0;
            this.y = 0;
            this.speed = -13;
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
    const background = new ScrollingBackground("./images_mdm/back.png");

    // Menino do morro

    class Menino {
        constructor(source1, source2, source3, width, height) {
            this.img1 = new Image();
            this.img1.src = source1;
            this.img2 = new Image();
            this.img2.src = source2;
            this.img3 = new Image();
            this.img3.src = source3;
            this.x = 50;
            this.y = 200;
            this.width = width;
            this.height = height;
            this.speed = 10;
        }
        draw() {
            if (myGameArea.score > 0 && myGameArea.score <= 11) {
                myGameArea.context.drawImage(
                    this.img1,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }

            if (myGameArea.score > 11 && myGameArea.score <= 21) {
                myGameArea.context.drawImage(
                    this.img2,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
            if (myGameArea.score > 21 && myGameArea.score < 100) {
                myGameArea.context.drawImage(
                    this.img3,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
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
            // Bordas do Menino
        }
        top() {
            return this.y;
        }

        bottom() {
            return this.y + this.height;
        }

        left() {
            return this.x;
        }

        right() {
            return this.x + this.width;
        }

        crashWith(obst) {
            return !(
                this.top() > obst.bottom() ||
                this.bottom() < obst.top() ||
                this.left() > obst.right() ||
                this.right() < obst.left()
            );
        }
    }

    //
    const boy = new Menino(
        "images_mdm/car1.png",
        "images_mdm/car2.png",
        "images_mdm/car3.png",
        110,
        150
    );

    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 87: // up arrow
                boy.moveUp();
                break;
            case 83: // down arrow
                boy.moveDown();
                break;
            case 65: // left arrow
                boy.moveLeft();
                break;
            case 68: // right arrow
                boy.moveRight();
                break;
        }
    });

    // Obstáculos
    class Obstaculo {
        constructor(type, x, y) {
            this.x = x;
            this.y = y;
            this.width = 80;
            this.height = 90;
            this.speed = 12;
            this.type = type;
        }
        // problemas
        draw() {
            if (this.type === "criminalidade") {
                this.criminalidade = new Image();
                this.criminalidade.src = "images_mdm/problemas/criminalidade.png";
                myGameArea.context.drawImage(
                    this.criminalidade,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }

            if (this.type === "desigualdade") {
                this.desigualdade = new Image();
                this.desigualdade.src = "images_mdm/problemas/desigualdade.png";
                myGameArea.context.drawImage(
                    this.desigualdade,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }

            if (this.type === "preconceito") {
                this.preconceito = new Image();
                this.preconceito.src = "images_mdm/problemas/preconceito.png";
                myGameArea.context.drawImage(
                    this.preconceito,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
            // Ìcones
            if (this.type === "cash") {
                this.cash = new Image();
                this.cash.src = "images_mdm/icones/cash.png";
                myGameArea.context.drawImage(
                    this.cash,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
            if (this.type === "estudo") {
                this.estudo = new Image();
                this.estudo.src = "images_mdm/icones/estudo.png";
                myGameArea.context.drawImage(
                    this.estudo,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        }

        // Velocidade dos ícones
        move() {
            this.x -= 10;
        }
        // Bordas dos objetos

        top() {
            return this.y + 40;
        }

        bottom() {
            return this.y + this.height - 30;
        }

        left() {
            return this.x + 10;
        }

        right() {
            return this.x + this.width - 10;
        }
    }

    function Sound(source, volume, loop) {
        this.source = source;
        this.volume = volume;
        this.loop = loop;
        var son;
        this.son = son;
        this.finish = false;
        this.stop = function () {
            document.body.removeChild(this.son);
        };
        this.start = function () {
            if (this.finish) return false;
            this.son = document.createElement("embed");
            this.son.setAttribute("src", this.source);
            this.son.setAttribute("hidden", "true");
            this.son.setAttribute("volume", this.volume);
            this.son.setAttribute("autostart", "true");
            this.son.setAttribute("loop", this.loop);
            document.body.appendChild(this.son);
        };
        this.remove = function () {
            document.body.removeChild(this.son);
            this.finish = true;
        };
        this.init = function (volume, loop) {
            this.finish = false;
            this.volume = volume;
            this.loop = loop;
        };
    }
    const foo = new Sound("audio/levantaeanda.wav", 100, true);


    const audioMusic = new Audio();
    audioMusic.src = "audio/levantaeanda.wav";
    audioMusic.volume = 0.07;

    const coinMusic = new Audio();
    coinMusic.src = "audio/coleta.mp3";
    coinMusic.volume = 0.08;

    const coinMusicNegative = new Audio();
    coinMusicNegative.src = "audio/badcoin.mp3";
    coinMusicNegative.volume = 0.08;
};

function reload() {
    window.location.reload(false);
}