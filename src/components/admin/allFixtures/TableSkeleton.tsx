import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableSkeleton = () => {
    return (
        <tbody>
            <tr>
                <td colSpan={4} className="my-5  w-full">
                    <Skeleton />
                </td>
            </tr>
            <tr>
                <td colSpan={4} className="my-5  w-full">
                    <Skeleton />
                </td>
            </tr>
            <tr>
                <td colSpan={4} className="my-5 w-full">
                    <Skeleton />
                </td>
            </tr>
            <tr>
                <td colSpan={4} className="my-5 w-full">
                    <Skeleton />
                </td>
            </tr>
        </tbody>
    );
};

export default TableSkeleton;

