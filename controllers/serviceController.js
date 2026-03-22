const Service = require('../models/Service');

exports.getService = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
};

exports.createService = async (req, res) => {
    try {
        const { name, description, price, duration, image } = req.body;
        const service = await Service.create({
            name,
            description,
            price,
            duration,
            image,
        });
        res.status(201).json({msg:"service created Successfully",service:service});
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
}

exports.updateService = async(req,res)=>{
    try {
        const service = Service.findById(req.params.id);
        if(!service){
            return res.status(404).json({msg:"Service Not found"})
        }
        const updateService = await Service.findOneAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json(updateService)
    } catch (error) {
        res.status(500).json({mag:"Server Error"})
    }
};

exports.deleteService = async(req,res)=>{
    try {
        const service = await Service.findById(req.params.id);
        if(!service){
            return res.status(404).json({msg:"Service Not Found"})
        }
        await service.deleteOne();
        res.status(200).json({msg:"Service Deleted Successfully"})
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
}