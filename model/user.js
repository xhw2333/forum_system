class User {
    constructor(id, name, pwd) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
    }

    set setId(val) {
        this.id = val;
    }

    get getId() {
        return this.id;
    }

    set setName(val) {
        this.name = val;
    }

    get getName() {
        return this.name;
    }

    set setPwd(val) {
        this.pwd = val;
    }

    get getPwd() {
        return this.pwd;
    }

}

module.exports = User;