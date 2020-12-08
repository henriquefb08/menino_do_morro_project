window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    };
    // funnções bases
    function startGame() {
        myGameArea.start();


    }

    function checkImpact() {
        for (let i = 0; i < myGameArea.myObstacles.length; i += 1) {
            if (boy.crashWith(myGameArea.myObstacles[0] === "criminalidade" )) { 
                myGameArea.myObstacles.splice(0,1)
                myGameArea.score -= 4;
            }
            else if (boy.crashWith(myGameArea.myObstacles[0] === "desigualdade" )) { 
                myGameArea.myObstacles.splice(0,1)
                myGameArea.score -=10;
        }
            else if (boy.crashWith(myGameArea.myObstacles[0] === "preconceito")) { 
            myGameArea.myObstacles.splice(0,1)
            myGameArea.score += 1;
         }
         else if (boy.crashWith(myGameArea.myObstacles[0] === "cash")) { 
            myGameArea.myObstacles.splice(0,1)
            myGameArea.score += 10;
         }
         else { 
            myGameArea.myObstacles.splice(0,1)
            myGameArea.score += 3;
         }
    }
}
   

    function updateGameArea() {
    
        background.move();
        background.draw();
        myGameArea.frames += 1;
        updateObstacles();
        boy.draw();
        checkImpact();
        myGameArea.counting();
        
    }

    


    function updateObstacles() {
        let problem = ['criminalidade', 'desigualdade', 'preconceito', 'cash', 'estudo']

        if (myGameArea.frames % 50 === 0) {
            let randomProblem = Math.floor(Math.random() * problem.length)
            // console.log(randomProblem)
            let minPos = 110;
            let maxPos = 390;
            let pos = Math.floor(Math.random() * (maxPos - minPos) + minPos)
            myGameArea.myObstacles.push(new Obstaculo(problem[randomProblem], 800, pos))
            
        }

        myGameArea.myObstacles.forEach(pbm => {
            pbm.move()
            pbm.draw()
            // console.log(pbm.type)
        });


    }
    //to organize here 
    const myGameArea = {
        canvas: document.querySelector('#quadro'),
        // pontuações iniciais
        estudo: 2,
        jobcash: 1,
        desigualdade: -10,
        preconceito: -3,
        criminalidade: -5,
        myObstacles: [],
        frames: 0,
        level: 1,
        score:1,
        start: function () {
            this.context = this.canvas.getContext('2d');
            this.canvas.width = 800;
            this.canvas.height = 500;
            background.draw();
            setInterval(updateGameArea, 100)
        },


        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        
        counting: function (){ 
            
            this.context.fillStyle = '#343a40'; 
            this.context.font = '38px Arial'; 
            this.context.fillText(`Life: ${this.score}`, 650, 450);

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
        constructor(source1, source2, source3, width, height) {
            this.img1 = new Image();
            this.img1.src = source1;
            this.img2 = new Image();
            this.img2.src = source2;
            this.img3 = new Image();
            this.img3.src = source3;
            this.x = 50;
            this.y = 300;
            this.width = width;
            this.height = height;
            this.speed = 10
        }
        draw() {

            //Criar if para leve para troca de skin 
            myGameArea.context.drawImage(this.img1, this.x, this.y, this.width, this.height);

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
            return !(this.top() > obst.bottom() ||
                this.bottom() < obst.top() ||
                this.left() > obst.right() ||
                this.right() < obst.left())
            }

    }

    // 
    const boy = new Menino('images_mdm/menino2.png', 'source2', 'source3', 90, 100)


    document.addEventListener('keydown', (e) => {
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
            this.width = 90;
            this.height = 100;
            this.speed = 10;
            this.type = type;
        }
        // problemas
        draw() {
            if (this.type === "criminalidade") {

                this.criminalidade = new Image()
                this.criminalidade.src = 'images_mdm/problemas/criminalidade.png';
                myGameArea.context.drawImage(this.criminalidade, this.x, this.y, this.width, this.height)
            }

            if (this.type === "desigualdade") {

                this.desigualdade = new Image()
                this.desigualdade.src = 'images_mdm/problemas/desigualdade.png';
                myGameArea.context.drawImage(this.desigualdade, this.x, this.y, this.width, this.height)
            }

            if (this.type === "preconceito") {

                this.preconceito = new Image()
                this.preconceito.src = 'images_mdm/problemas/preconceito.png';
                myGameArea.context.drawImage(this.preconceito, this.x, this.y, this.width, this.height)
            }
            // Ìcones
            if (this.type === "cash") {

                this.cash = new Image()
                this.cash.src = 'images_mdm/icones/cash.png';
                myGameArea.context.drawImage(this.cash, this.x, this.y, this.width, this.height)
            }
            if (this.type === "estudo") {

                this.estudo = new Image()
                this.estudo.src = 'images_mdm/icones/estudo.png';
                myGameArea.context.drawImage(this.estudo, this.x, this.y, this.width, this.height)
            }
        }

        // Velocidade dos ícones
        move() {
            this.x -= 10;
        }
        // Bordas dos objetos

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

        
        }


    };

    // Entender detecção por borda da imagem para criar impacto (crash with) e fazer sumir de acordo com cada objeto e somar/subtrair no score
    // Criar função para Score
    // Crio uma função que verifica o score e partindo de um determinado valor ele apresenta um push sendo imagem ou texto (em uma determinada area do jogo)
    // A mudança de roupa ou personagem pode estar condicionada as mensagens

