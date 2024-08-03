export default function Copy() {
    return (
        <>
            <p className='copy' style={{ width: '100%', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white', padding: '10px 0',margin:'0' }}>
                &copy; {new Date().getFullYear()}. NeoResort. All rights reserved.
            </p>
        </>
    );
}
