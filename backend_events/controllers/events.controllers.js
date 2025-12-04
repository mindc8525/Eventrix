import mongoose from 'mongoose';
import Event from '../models/events.models.js';
// import Admin from '../models/admin.models.js';
import { eventSchema } from '../models/events.zod.js';
import { z } from 'zod';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { deleteFromCloudinary } from '../utils/cloudinary.js';


export const getEvent = async (req, res) => {
    try {
        const clubID = req.params.clubID;
        if (clubID) {
            console.log(clubID);
            const events = await Event.find({ clubID: clubID });
            if (events.length > 0) {
                return res.status(200).json(new ApiResponse(200, "Events fetched successfully.", events));
            } else {
                return res.status(404).json(new ApiResponse(404, "No events found for this club."));
            }
        }
        const { id } = req.params;
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);
            }
            const event = await Event.findById(id);
            if (event) {
                return res.status(200).json(new ApiResponse(200, "Event fetched successfully.", event));
            } else {
                return res.status(404).json(new ApiResponse(404, "No such event found."));
            }
        } else {
            const events = await Event.find({});
            return res.status(200).json(new ApiResponse(200, "Events fetched successfully.", events));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong while fetching events."));
    }
}

export const createEvent = async (req, res) => {
    try {
        // console.log(req.file);
        // const { clubID } = req.admin.clubID;
        // req.body.clubID = clubID; 
        const coverImg = req.file ? await uploadOnCloudinary(req.file.path) : null;
        if (coverImg) {
            req.body.coverImage = {
                public_id: coverImg.public_id,
                url: coverImg.url,
            };
        }
        else {
            req.body.coverImage = undefined; // Ensure it's undefined if no file is uploaded
        }
        const validatedData = eventSchema.parse(req.body);
        const newEvent = new Event(validatedData);
        await newEvent.save();
        res.status(201).json(new ApiResponse(201, "Event created successfully.", newEvent));
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(new ApiResponse(400, "Validation error", error.errors));
        } else {
            console.log(error); // Debugging line to log the error
            res.status(500).json(new ApiResponse(500, "Something went wrong while creating event."));
        }
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);
    try {
        const event = await Event.findById(id);
        if(event){
            if (event.coverImage) {
                const public_ID = event.coverImage.public_id;
                await deleteFromCloudinary(public_ID);
            }
            await Event.findByIdAndDelete(id);
            res.status(200).json(new ApiResponse(200, "Event deleted successfully."));
        }
        else{
            res.status(404).json(new ApiResponse(404, "No such event found."));
        }
    } catch (error) {
        console.log(error); // Debugging line to log the error
        res.status(500).json(new ApiResponse(500, "Something went wrong while deleting event."));
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);
    try {
        const _event = await Event.findById(id);
        if (!_event) {
            return res.status(404).json(new ApiResponse(404, "No such event found."));
        }
        let coverImg = null;
        if (req.file) {
            if (_event.coverImage && _event.coverImage.public_id) {
                await deleteFromCloudinary(_event.coverImage.public_id);
            }
            coverImg = await uploadOnCloudinary(req.file.path);
            req.body.coverImage = {
                public_id: coverImg.public_id,
                url: coverImg.url,
            };
        }  else {
            req.body.coverImage = undefined; // Ensure it's undefined if no file is uploaded
        }
        const validatedData = eventSchema.parse(req.body);
        const { name, short_description, description, date, time, location, status, coverImage} = validatedData;
        // const clubID = req.admin.clubID
        const updatedEvent = { name, short_description, description, date, time, location, status, coverImage, _id: id };
        const event = await Event.findByIdAndUpdate(id, updatedEvent, { new: true });
        if (event) {
            res.status(200).json(new ApiResponse(200, "Event updated successfully.", event));
        } else {
            res.status(404).json(new ApiResponse(404, "No such event found."));
        }
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(new ApiResponse(400, error.errors));
        } else {
            console.log(error); 
            res.status(500).json(new ApiResponse(500, "Something went wrong while updating event."));
        }
    }
}