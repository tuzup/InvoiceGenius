const model = require('../model/schema')

/*
Add New Camera Function
API: POST /camera/add
Accepts: cameraName, cameraPrice, cameraID, cameraCategory
*/
exports.addCamera = async (req, res) => {
    try {
        const { cameraName, cameraPrice, cameraID, cameraCategory } = req.body; // Extract camera data from the request body

        // Check if the camera already exists with the same ID
        const existingCamera = await model.Camera.findOne({ cameraID: cameraID });
        if (existingCamera) {
            const err = new Error('Camera with the provided ID already exists');
            err.status = 400; // Bad Request
            throw err;
        }

        // Create a new camera instance
        const newCamera = new model.Camera({
            cameraName: cameraName,
            cameraPrice: cameraPrice,
            cameraID: cameraID,
            cameraCategory: cameraCategory,
        });

        // Save the new camera to the database
        await newCamera.save();

        // Respond with success message
        res.status(201).json({
            status: 'Success',
            message: 'Camera added successfully',
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        console.error(`URL : ${req.originalUrl} | status : ${err.status || 500} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error',
        });
    }
};


/*
Edit Camera Function
API: PUT /camera/edit/:cameraID
Accepts: Updated camera data in the request body
*/
exports.editCamera = async (req, res) => {
    try {
        const cameraID = req.params.cameraID;
        const updatedCameraData = req.body; // Updated camera data from the request body

        // Check if the camera exists
        const existingCamera = await model.Camera.findOne({ cameraID: cameraID });
        if (!existingCamera) {
            const err = new Error('Camera not found');
            err.status = 404;
            throw err;
        }

        // Update the camera data
        await model.Camera.findOneAndUpdate({ cameraID: cameraID }, updatedCameraData, { new: true });

        // Respond with success message
        res.status(200).json({
            status: 'Success',
            message: 'Camera updated successfully',
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        console.error(`URL : ${req.originalUrl} | status : ${err.status || 500} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error',
        });
    }
};

/*
Delete Camera Function
API: DELETE /camera/delete/:cameraID
*/
exports.deleteCamera = async (req, res) => {
    try {
        const cameraID = req.params.cameraID;

        // Check if the camera exists
        const existingCamera = await model.Camera.findOne({ cameraID: cameraID });
        if (!existingCamera) {
            const err = new Error('Camera not found');
            err.status = 404;
            throw err;
        }

        // Delete the camera
        await model.Camera.deleteOne({ cameraID: cameraID });

        // Respond with success message
        res.status(200).json({
            status: 'Success',
            message: 'Camera deleted successfully',
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        console.error(`URL : ${req.originalUrl} | status : ${err.status || 500} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error',
        });
    }
};


/*
View Camera Function
API: POST /camera/view
Accepts: { cameraID, cameraName, cameraCategory } in the request body
*/
exports.viewCamera = async (req, res) => {
    try {
        const { cameraID, cameraName, cameraCategory } = req.body;

        if (cameraID) {
            // Find the camera by ID
            const camera = await model.Camera.findOne({ cameraID: cameraID });
            if (!camera) {
                const err = new Error('Camera not found');
                err.status = 404;
                throw err;
            }

            // Respond with the camera details
            res.status(200).json({
                status: 'Success',
                camera: camera,
            });
        } else if (cameraName) {
            // Find the camera by name
            const camera = await model.Camera.findOne({ cameraName: cameraName });
            if (!camera) {
                const err = new Error('Camera not found');
                err.status = 404;
                throw err;
            }

            // Respond with the camera details
            res.status(200).json({
                status: 'Success',
                camera: camera,
            });
        } else if (cameraCategory) {
            // Find cameras by category
            const cameras = await model.Camera.find({ cameraCategory: cameraCategory });
            if (!cameras || cameras.length === 0) {
                const err = new Error('Cameras not found for the specified category');
                err.status = 404;
                throw err;
            }

            // Respond with the cameras details
            res.status(200).json({
                status: 'Success',
                cameras: cameras,
            });
        } else {
            const err = new Error('Invalid request. Please provide cameraID, cameraName, or cameraCategory in the request body.');
            err.status = 400;
            throw err;
        }
    } catch (err) {
        // Log the error and send an appropriate response to the client
        console.error(`URL : ${req.originalUrl} | status : ${err.status || 500} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error',
        });
    }
};
