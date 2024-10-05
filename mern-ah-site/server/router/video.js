import express from "express";
import videoModel from "../model/video.js";
import { QUERY } from "../helper/constants.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import upload from "../config/multer-config.js";
import {
  cloudinary_uploadImageFile,
  cloudinary_deleteFile,
} from "../config/cloudinary-config.js";

const videoRouter = express.Router();

videoRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.SEARCH;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _skip = (_page - 1) * _limit;

    const filter = {
      $or: [
        {
          title: {
            $regex: _q,
            $options: "i", // case insensitive search
          },
        },
        {
          code: {
            $regex: _q,
            $options: "i", // case insensitive search
          },
        },
      ],
    };

    const datas = await videoModel.find(filter).limit(_limit).skip(_skip);
    const count_row = await videoModel.countDocuments(filter);
    const count_page = Math.ceil(count_row / _limit);
    return handleResponse(res, {
      message: "Get all videos successfully!",
      status: StatusCodes.OK,
      data: {
        results: datas,
        totalPages: count_page,
        totalRows: count_row,
        query: _q,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

videoRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await videoModel.findById(id);

    return handleResponse(res, {
      message: "Get video successfully!",
      status: StatusCodes.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

videoRouter.post(`/create`, upload.single("file"), async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;
    const thumbnail_url = file
      ? (await cloudinary_uploadImageFile(file)).url
      : "";
    const newData = await videoModel.create({
      ...body,
      thumbnail_url: thumbnail_url,
    });

    return handleResponse(res, {
      message: "Create video successfully!",
      status: StatusCodes.CREATED,
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

videoRouter.put(
  `/update-id/:id`,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;
      let thumbnail_url = body.thumbnail_url;
      if (file) {
        thumbnail_url = (await cloudinary_uploadImageFile(file)).url;
        await cloudinary_deleteFile(body.thumbnail_url);
      }

      const updateData = await videoModel.findByIdAndUpdate(id, {
        ...body,
        thumbnail_url: thumbnail_url,
      });

      return handleResponse(res, {
        message: "Update video successfully!",
        status: StatusCodes.OK,
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }
);

videoRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await videoModel.findByIdAndDelete(id);

    if (deleteData) {
      await cloudinary_deleteFile(deleteData.thumbnail_url);
    }

    return handleResponse(res, {
      message: "Delete video successfully!",
      status: StatusCodes.OK,
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default videoRouter;
