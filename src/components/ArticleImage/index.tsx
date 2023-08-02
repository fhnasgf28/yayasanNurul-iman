import classes from './Images.module.scss';
import { ImageSize } from "../../shared/enums"
import { combineClasses, transformImagePaths } from '../../utils/utils';
import Zoom from 'react-medium-image-zoom'
import LazyImage from '../LazyImage/LazyImage';


interface IArticleImage {
    src: string,
    caption?: string,
    size?: ImageSize,
    alt?: string,
    className?: string
}
const Image: React.FC<IArticleImage> = ({ src, caption, size = ImageSize.DEFAULT, alt = '', className }) => {
    return (
        <div className={combineClasses(classes.article_image, classes.article_image__wrapper, className, classes['size_' + size], 'display-block mx-auto my-5 ')}>
            <Zoom>
                <LazyImage src={transformImagePaths(src)}
                         alt={alt}
                         className={combineClasses('block', 'w-full', 'rounded-lg shadow-md')}/>
            </Zoom>
            {
                caption &&
                <p className={combineClasses(classes.article_image__caption, "mb-0 mt-2 text-sm w-full text-center ")}>{caption}</p>
            }
        </div>
    )
}

export default Image