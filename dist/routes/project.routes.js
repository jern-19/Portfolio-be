"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Portfolio",
            description: "My personal portfolio",
        },
    ]);
});
exports.default = router;
