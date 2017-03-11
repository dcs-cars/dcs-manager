require("whatwg-fetch");

class Client{
    async getResponse(url,opts){
		opts = opts||{};
        opts.headers = opts.headers||{};
		opts.credentials = "same-origin";
        if(!opts.body && opts.jsonBody){
            opts.body = JSON.stringify(opts.jsonBody);
            opts.headers["Content-Type"] = "application/json";
        }
		var response = await fetch(url,opts);
		if(response.status != 200) {
			var err = new Error(response.statusText);
			err.code = response.status;
			err.message = await response.text();
			throw err;
		};
		return response;
	}
	async getText(url,opts){
		var res = await this.getResponse(url,opts);
		return await res.text();
	}
	async getJson(url,opts){
		var data = await this.getText(url,opts);
		try{
			data = JSON.parse(data);
		}catch(e){
			throw new Error("Response was not valid JSON");
		}
		return data;
	}
	async execute(url,opts){
		await this.getResponse(url,opts);
	}

	async getSales(opts){
        var params = new URLSearchParams();
		if(opts.tenant) params.append("tenant",opts.tenant);
		if(opts.car) params.append("car",opts.car);
		if(opts.from !== null) params.append("from",opts.from);
		if(opts.to !== null) params.append("to",opts.to);
		if(opts.kmFrom !== null) params.append("kmFrom",opts.kmFrom);
		if(opts.kmTo !== null) params.append("kmTo",opts.kmTo);
		return await this.getJson("/api/sales?"+params.toString());
	}

	async createSale(data){
		return await this.getText("/api/sales",{method:"POST",jsonBody:data})
	}

	async getSale(sale){
		return await this.getJson("/api/sales/"+sale);
	}

	async updateSale(sale,data){
		await this.execute("/api/sales/"+sale,{method:"PATCH",jsonBody:data});
	}

	async deleteSale(sale){
		await this.execute("/api/sales/"+sale,{method:"DELETE"});
	}
	async getServices(opts){
        var params = new URLSearchParams();
		if(opts.tenant) params.append("tenant",opts.tenant);
		if(opts.car) params.append("car",opts.car);
		if(opts.from !== null) params.append("from",opts.from);
		if(opts.to !== null) params.append("to",opts.to);
		if(opts.paid !== null) params.append("paid",opts.paid);
		return await this.getJson("/api/services?"+params.toString());
	}

	async createService(data){
		return await this.getText("/api/services",{method:"POST",jsonBody:data})
	}

	async getService(service){
		return await this.getJson("/api/services/"+service);
	}

	async updateService(service,data){
		await this.execute("/api/services/"+service,{method:"PATCH",jsonBody:data});
	}

	async deleteService(service){
		await this.execute("/api/services/"+service,{method:"DELETE"});
	}
    async getRentals(opts){
        var params = new URLSearchParams();
		if(opts.property) params.append("property",opts.property);
        if(opts.tenant) params.append("tenant",opts.tenant);
		if(opts.startFrom !== null) params.append("startFrom",opts.startFrom);
		if(opts.startTo !== null) params.append("startTo",opts.startTo);
		if(opts.endFrom !== null) params.append("endFrom",opts.endFrom);
		if(opts.endTo !== null) params.append("endTo",opts.endTo);
        return await this.getJson("/api/rentals?"+params.toString());
    }

    async createRental(data){
        return await this.getText("/api/rentals",{method:"POST",jsonBody:data})
    }

    async getRental(rental){
        return await this.getJson("/api/rentals/"+rental);
    }

    async updateRental(rental,data){
        await this.execute("/api/rentals/"+rental,{method:"PATCH",jsonBody:data});
    }

    async deleteRental(rental){
        await this.execute("/api/rentals/"+rental,{method:"DELETE"});
    }

	async uploadTemplate(id,data){
		await this.execute("/api/templates/"+id,{method:"PUT",body:data})
	}
}
module.exports = new Client();
