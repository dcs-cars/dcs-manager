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

	async getSales(){
		return await this.getJson("/api/sales");
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
	async getServices(){
		return await this.getJson("/api/services");
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
}
module.exports = new Client();
