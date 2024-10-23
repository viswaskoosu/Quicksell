import React from 'react';
import { ReactComponent as MenuIcon } from '../icons/3 dot menu.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import { ReactComponent as BacklogIcon } from '../icons/Backlog.svg';
import { ReactComponent as CancelledIcon } from '../icons/Cancelled.svg';
import { ReactComponent as DisplayIcon } from '../icons/Display.svg';
import { ReactComponent as DoneIcon } from '../icons/Done.svg';
import { ReactComponent as DownIcon } from '../icons/down.svg';
import { ReactComponent as HighPriorityIcon } from '../icons/Img - High Priority.svg';
import { ReactComponent as LowPriorityIcon } from '../icons/Img - Low Priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../icons/Img - Medium Priority.svg';
import { ReactComponent as InProgressIcon } from '../icons/in-progress.svg';
import { ReactComponent as NoPriorityIcon } from '../icons/No-priority.svg';
import { ReactComponent as UrgentPriorityColorIcon } from '../icons/SVG - Urgent Priority colour.svg';
import { ReactComponent as UrgentPriorityGreyIcon } from '../icons/SVG - Urgent Priority grey.svg';
import { ReactComponent as TodoIcon } from '../icons/To-do.svg';

const TaskIcons = {
  Menu: MenuIcon,
  Add: AddIcon,
  Backlog: BacklogIcon,
  Cancelled: CancelledIcon,
  Display: DisplayIcon,
  Done: DoneIcon,
  Down: DownIcon,
  PriorityHigh: HighPriorityIcon,
  PriorityLow: LowPriorityIcon,
  PriorityMedium: MediumPriorityIcon,
  InProgress: InProgressIcon,
  PriorityNone: NoPriorityIcon,
  PriorityUrgentColor: UrgentPriorityColorIcon,
  PriorityUrgentGrey: UrgentPriorityGreyIcon,
  Todo: TodoIcon
};

export default TaskIcons;
