/*
 * we need to build this datepicker components for using dayjs instead of momnetjs: https://ant.design/docs/react/replace-moment-cn
 */

import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";
import "antd/lib/date-picker/style/index";

const DatePicker = generatePicker(dayjsGenerateConfig);

export default DatePicker;
