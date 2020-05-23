// Kelvin
exports.k2f = (value)=>{
    return ((value-273.15) * 9/5 + 32)
}
exports.k2c = (value)=>value-273.15
exports.k2r = (value)=>value*1.8

// Fahrenheit 
exports.f2k = (value)=>{
    return ((value-32) * 5/9 + 273.15)
}
exports.f2c = (value)=>{
    return ((value-32) * 5/9 )
}
exports.f2r = (value)=> {
    console.log(value+459.67)
    return value + 459.67;
}

//Celsius
exports.c2k = (value)=>value+ 273.15 
exports.c2f = (value)=>{
    return ((value * 9/5) + 32)
}
exports.c2r = (value)=>(value * 9/5 + 491.67)

//rankine
exports.r2k = (value)=>value * 5/9 
exports.r2f = (value)=>value -  459.67
exports.r2c = (value)=>{
    return ((value-491.67) * 5/9)
}

//cups liters
exports.cups2liters = (value)=>value/4.227
exports.liters2cups = (value)=>value*4.227
