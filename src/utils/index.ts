
import { FILE_SIZE_DEFAULT, FORMAT_DATE_TIME } from '@/stores/constants/constant';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'
import { useErrorStore } from '@/stores/error.store'

dayjs.extend(utc);


const { t } = useI18n();

export function convertSize(bytes: number) {
  if (bytes) {
    const units = ['bytes', 'KB', 'MB'];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, unitIndex)).toFixed(2);
    return size + ' ' + units[unitIndex];
  }
  return FILE_SIZE_DEFAULT;
}


export function convertDate(date: any, format = true) {
  if (!date) {
    return '';
  }
  let dateString = dayjs(date);

  if (format) {
    return dateString.format(FORMAT_DATE_TIME);
  }

  return dateString.format("YYYY/MM/DD");
}

export function convertUTCDate(date: any, format = true) {
  if (!date) {
    return '';
  }
  let dateString = dayjs.utc(date);

  if (format) {
    return dateString.format(FORMAT_DATE_TIME);
  }

  return dateString.format("YYYY/MM/DD");
}

export function responseErrorMessage(content: any) {
  const random = (Math.random() + 1).toString(36).substring(7);
  if (!useErrorStore().isMessageShowed(content)) {
    useErrorStore().addMessageToShowList(content as string);
    message.error({
      content: content,
      duration: 0,
      key: random,
      onClick: () => {
        message.destroy(random)
        useErrorStore().closeMessage(content as string);
      }
    });
  }
}

export function responseSuccessMessage(content: any) {
  message.success(content);
}

export function convertUTCDateTime(datetime: any){
  if(!datetime) {
    return '';
  }
  let dateString = dayjs.utc(datetime);

  return dateString.format("YYYY/MM/DD HH:mm");
}


export function parseTime(time: any, cFormat: string): string | null {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;

  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), '-');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }

  const formatObj: { [key in 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'a']: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  const timeStr = format.replace(/{([ymdhisa])+}/g, (_result: string, key: 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'a') => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });

  return timeStr;
}

export function isHEIC(file: any) {
  // check file extension since windows returns blank mime for heic
  if (!file.name) {
    file.name = file.fileName;
  }
  const x = file.type ? file.type.split('image/').pop() : file.name.split('.').pop().toLowerCase();
  return x == 'heic' || x == 'heif';
}

export function isHEICExtension(extension: any) {
  // check file extension since windows returns blank mime for heic
  return extension.toLowerCase() == 'heic' || extension.toLowerCase() == 'heif';
}


export const sleep = async (sleepTime: number) => {
  return new Promise((resolve) => setTimeout(resolve, sleepTime));
};