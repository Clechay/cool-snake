module.exports={
	success:(res,data,meta)=>{
		if(!meta) meta = {};
		if(meta.pagination){
			// ADD PAGINATION SUPPORT
		}
		res.json({
			status:"SUCCESS",
			data
		})
	},
	fail:(res,description,meta)=>{
		if(!meta) meta = {};
		res.json({
			status:"FAIL",
			description
		})
	},
}