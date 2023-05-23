import {Sequelize} from 'sequelize'
const self = module.exports;
export let sequelize;

exports.initialize= ()=>{
    if(!sequelize){
        sequelize = new Sequelize('free_com','root','hasan$123',{

            host:'localhost',
            dialect:'mysql',
            logging:false

        })
    }
    return sequelize;
}
self.initialize();
module.exports = {sequelize};