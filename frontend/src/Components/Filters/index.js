import { Button } from "antd";

import "./index.css";

const filtersData = [
    { msg: "全部", index: 0 },
    { msg: "已完成", index: 1 },
    { msg: "未完成", index: 2 },
];

const filters = ({ setFilter, filter }) => {
    return (
        <div className="filters">
            {filtersData.map(({ index, msg }) => (
                <Button
                    className="filter-item"
                    key={index}
                    onClick={() => setFilter(index)}
                    type={filter === index ? "primary" : "default"}
                >
                    {msg}
                </Button>
            ))}
        </div>
    );
};

export default filters;
