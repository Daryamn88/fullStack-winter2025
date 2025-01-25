const assert = require ('assert')
const calculator = require('../calculator')

describe('validating calculator functions', () =>{
    it('should return 3 for (1,2)', ()=>{
        assert.equal(calculator.add(1,2),3)
    })

    it('should return 4 for (1,2)-Fail test', ()=>{
        assert.equal(calculator.add(1,2),4)
    })

    it('should return 2 for (1,2)', ()=>{
        assert.equal(calculator.mul(1,2),2)
    })

    it('should return 3 for (1,2)-Fail test', ()=>{
        assert.equal(calculator.mul(1,2), 3)
    })

    it('should equal 2 for (4,2)', ()=>{
        assert.equal(calculator.div(4,2),2)
    })

    it('should equal 1 for (4,2)-Fail test', ()=>{
        assert.equal(calculator.div(4,2),1)
    })

    it('should equal 3 for (8,5)', ()=>{
        assert.equal(calculator.sub(8,5),3)
    })

    it('should return 2 for (8,5)- Fail test', ()=>{
        assert.equal(calculator.sub(8,5),2)
    })
})