import express from "express";
import idolModel from "../model/idol.js";
import { QUERY } from "../helper/constants.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import upload from "../config/multer-config.js";
import {
  cloudinary_uploadImageFile,
  cloudinary_deleteFile,
} from "../config/cloudinary-config.js";

const idolRouter = express.Router();

idolRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.SEARCH;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _skip = (_page - 1) * _limit;

    const filter = {
      $or: [
        {
          name: {
            $regex: _q,
            $options: "i", // case insensitive search
          },
        },
        {
          other_name: {
            $regex: _q,
            $options: "i", // case insensitive search
          },
        },
      ],
    };

    const datas = await idolModel.find(filter).limit(_limit).skip(_skip);
    const count_row = await idolModel.countDocuments(filter);
    const count_page = Math.ceil(count_row / _limit);
    return handleResponse(res, {
      message: "Get idols successfully!",
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

idolRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await idolModel.findById(id);

    return handleResponse(res, {
      message: "Get idol successfully!",
      status: StatusCodes.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

idolRouter.post(`/create`, upload.single("file"), async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;
    const avatar_url = file ? (await cloudinary_uploadImageFile(file)).url : "";
    const newData = await idolModel.create({
      ...body,
      avatar_url: avatar_url,
    });

    return handleResponse(res, {
      message: "Create idol successfully!",
      status: StatusCodes.CREATED,
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

idolRouter.put(
  `/update-id/:id`,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;
      let avatar_url = body.avatar_url;
      if (file) {
        avatar_url = (await cloudinary_uploadImageFile(file)).url;
        await cloudinary_deleteFile(body.avatar_url);
      }

      const updateData = await idolModel.findByIdAndUpdate(
        id,
        {
          ...body,
          avatar_url: avatar_url,
        },
        { new: true }
      );

      return handleResponse(res, {
        message: "Update idol successfully!",
        status: StatusCodes.OK,
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }
);

idolRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await idolModel.findByIdAndDelete(id, { new: true });

    if (deleteData) {
      await cloudinary_deleteFile(deleteData.avatar_url);
    }

    return handleResponse(res, {
      message: "Delete idol successfully!",
      status: StatusCodes.OK,
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default idolRouter;
