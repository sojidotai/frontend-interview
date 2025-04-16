import { usePreview } from './api';

type PreviewProps = {
    docId: number;
};

const Preview = ({ docId }: PreviewProps) => {
    const { data: url } = usePreview(docId);

    return (
        url && (
            <iframe
                className="w-full h-full flex-1"
                src={url}
                style={{ height: '100%', minHeight: '100%' }}
            ></iframe>
        )
    );
};

export default Preview;
