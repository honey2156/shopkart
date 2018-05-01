const route = require('express').Router()
const Vendor = require('../../db').Vendor

// get all vendors
route.get('/', (req, res) => {
    getVendors()
        .then((vendors) => {
            res.json(vendors)
        })
        .catch((err) => {
            console.log('error while fetching vendors ' + err)
        })
})

// Add new vendor
route.post('/', (req, res) => {
    let vendor = new Vendor({
        name: req.body.name
    })

    vendor.save()
    res.json({
        success: true,
        vendor: vendor
    })
})

// fetches vendors from database
async function getVendors() {
    return Vendor.findAll()
}

module.exports = route