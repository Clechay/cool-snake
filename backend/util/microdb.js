class MicroDB {
	data;
	constructor(){
		this.data = new Set();
	}
	find = (col,val) => {
		for (const record of this.data.values()) {
			if(record[col] === val) return record;
	  	}
	}
	add = (record) => {
		this.data.add(record);
	}
	remove = (record) => {
		this.data.delete(record);
	}
}

module.exports = MicroDB;