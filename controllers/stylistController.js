const Stylist = require('../models/Stylist');

exports.getAllStylists = async(req,res) =>{
    try {
        const stylist = await Stylist.find().populate("specialties");
        res.status(200).json(stylist);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"})
    }
}


exports.getStylistByID = async(req,res)=>{
    try {
        const stylist = await Stylist.findById(req.params.id).populate("specialties");
        if(!stylist){
            return res.status(404).json({msg:"Stylist Not Found"})
        }
        res.status(200).json(stylist);
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
}

exports.createStylist = async(req,res)=>{
    try {
        const  { name, bio, image, specialties } = req.body;
        const stylist = await Stylist.create({
            name,
            bio,
            image,
            specialties
        });
        res.status(201).json({mag:"New Stylist created",stylist:stylist});
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
    }
};

exports.updateStylist = async(req,res)=>{
    try {
        const stylist = await Stylist.findById(req.params.id);
        if(!stylist){
            return res.status(404).json({mag:"Stylist Not Found"});
        }
        const updatedStylist = await Stylist.findOneAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json({msg:"Stylist Updated Successfully",stylist:updatedStylist});
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
    }
}

exports.deleteStylist = async (req,res)=>{
    try {
        const stylist = await Stylist.findById(req.params.id);
        if(!stylist){
            return res.status(404).json({mag:"Stylist Not Found"});
        }
        await stylist.deleteOne();
        res.status(200).json({mag:"Stylist deleted Sunccesfully"});
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
    }
}