import axios from "axios";
import { utilService } from "../utils/utils.js";
axios.defaults.withCredentials = true;

export const boardService = {
  query,
  deleteBoard,
  save,
  getById,
  getEmptyBoard,
};

function _getUrl(id = "") {
  const BASE_URL =
    process.env.NODE_ENV !== "development"
      ? "/api/board"
      : "//localhost:3030/api/board";
  return `${BASE_URL}/${id}`;
}
async function query() {
  const res = await axios.get(_getUrl());
  const boards = res.data;
  return boards;
}
async function getById(boardId) {
  const res = await axios.get(_getUrl(boardId));
  const board = res.data;
  return board;
}

async function deleteBoard(boardId) {
  const deletedBoard= await axios.delete(_getUrl(boardId));
  return deletedBoard.data
}
async function _add(board) {
  const savedBoard = await axios.post(_getUrl(), board);
  return savedBoard.data;
}

async function _update(board) {
  const savedBoard = await axios.put(_getUrl(board._id), board);
  return savedBoard.data;
}

function save(board) {
  return board._id ? _update(board) : _add(board);
}

function getEmptyBoard() {
  return utilService.getNewBoard();
}
