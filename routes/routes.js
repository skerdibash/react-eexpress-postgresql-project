// routes/quote-routes.js

// Import express
const express = require('express');
// Define the router using the express router
const AppRouter = express.Router();

// Import the controllers
const BusinessController = require('../controllers/business-controller');
const StaffController = require('../controllers/staff-controller');

// For each route access the correct controller method

AppRouter.get("/businesses", BusinessController.getAll);
AppRouter.get("/businesses/:businessId", BusinessController.getById);
AppRouter.get("/create-business/name/:name/location/:location", BusinessController.create);
AppRouter.get("/create-business/name/:name/location/:location/type/", BusinessController.create);
AppRouter.get("/create-business/name/:name/location/:location/type/:type", BusinessController.create);
AppRouter.get("/update-business/:businessId/name/:name/location/:location", BusinessController.update);
AppRouter.get("/update-business/:businessId/name/:name/location/:location/type/", BusinessController.update);
AppRouter.get("/update-business/:businessId/name/:name/location/:location/type/:type", BusinessController.update);
AppRouter.get("/remove-business/businessId/:businessId", BusinessController.remove);

AppRouter.get("/businesses/:businessId/staff", StaffController.getAll);
AppRouter.get("/businesses/:businessId/staff/:staffId", StaffController.getById);
AppRouter.get("/businesses/:businessId/create-staff/email/:email/firstName/:firstName/lastName/:lastName/position/:position", StaffController.create);
AppRouter.get("/businesses/:businessId/create-staff/email/:email/firstName/:firstName/lastName/:lastName/position/:position/phone/", StaffController.create);
AppRouter.get("/businesses/:businessId/create-staff/email/:email/firstName/:firstName/lastName/:lastName/position/:position/phone/:phone", StaffController.create);
AppRouter.get("/update-staff/:staffId/email/:email/firstName/:firstName/lastName/:lastName/position/:position", StaffController.update);
AppRouter.get("/update-staff/:staffId/email/:email/firstName/:firstName/lastName/:lastName/position/:position/phone/", StaffController.update);
AppRouter.get("/update-staff/:staffId/email/:email/firstName/:firstName/lastName/:lastName/position/:position/phone/:phone", StaffController.update);
AppRouter.get("/remove-staff/staffId/:staffId", StaffController.remove);

// Export the router
module.exports = AppRouter;