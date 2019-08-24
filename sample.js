// ここではJSにおける継承の仕組みを実際に書いて学ぶ
// プロトタイプによる継承
let sample01 = function() {
    function Animal(type) {
        this.type = type;
    }

    Animal.isAnimal = function (obj, type) {
        if (!Animal.prototype.isPrototypeOf(obj)) {
            return false;
        }
        return type ? obj.type === type : true;
    };

    function Dog(name, breed) {
        Animal.call(this, "dog");
        this.name = name;
        this.breed = breed;
    }

    Object.setPrototypeOf(Dog.prototype, Animal.prototype);

    Dog.prototype.bark = function () {
        console.log("ruff, ruff");
    };

    Dog.prototype.print = function () {
        console.log("The dog" + this.name + " is a " + this.breed);
    };

    Dog.isDog = function (obj) {
        return Animal.isAnimal(obj, "dog");
    };

    let sparkie = new Dog("Sparkie", "Border Collie");

    console.log(sparkie.name);
    console.log(sparkie.breed);
    sparkie.bark();
    sparkie.print();
    Dog.isDog(sparkie);
};
sample01();

let sample02 = function () {
    // Classを用いた継承
    class Animal {
        constructor(type) {
            this.type = type;
        }
        static isAnimal(obj, type){
            if(!Animal.prototype.isPrototypeOf(obj)){
                return false;
            }
            return type ? obj.type === type : true;
        }
    }

    class Dog extends Animal {
        constructor(name, breed){
            super("dog");
            this.name = name;
            this.breed = breed;
        }
        bark() {
            console.log("ruff, ruff");
        }
        print() {
            console.log("The dog" + this.name + " is a " + this.breed);
        }
        static isDog(obj) {
            return Animal.isAnimal(obj, "dog");
        }
    }

    let same = new Dog("same", "Toy poodle");
    same.print();
    same.bark();
};
sample02();

// newを用いない明示的なプロトタイプ宣言
let sample03 = function () {
  let Animal = {
      create(type){
          let animal = Object.create(Animal.prototype);
          animal.type = type;
          return animal;
      },
      isAnimal(obj, type) {
          if(!Animal.prototype.isPrototypeOf(obj)){
              return false;
          }
          return type ? obj.type === type : true;
      },
      prototype: {}
  };
  let Dog = {
      create(name, breed){
          let dog = Object.create(Dog.prototype);
          Object.assign(dog, Animal.create("dog"));
          dog.name = name;
          dog.breed = breed;
          return dog;
      },
      isDog(obj){
          return Animal.isAnimal(obj, "dog");
      },
      prototype: {
          bark(){
              console.log("tuff, ruff");
          },
          print(){
              console.log("The dog " + this.name + " is a " + this.breed);
          }
      }
  };
  Object.setPrototypeOf(Dog.prototype, Animal.prototype);

  let sharpie = Dog.create("Sharpie", "Border Collie");
  sharpie.bark();
  sharpie.print();
};
sample03();
