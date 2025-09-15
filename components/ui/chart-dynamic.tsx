import dynamic from 'next/dynamic';
import { ChartConfig } from './chart';

// 定义动态图表组件的props类型
interface DynamicChartProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

// 使用dynamic导入，并禁用服务器端渲染
const DynamicChart = dynamic<DynamicChartProps>(
  () => import('./chart').then((mod) => mod.ChartContainer),
  {
    ssr: false,
    loading: () => <div className="h-[300px] w-full flex items-center justify-center">加载中...</div>,
  }
);

export default DynamicChart;