import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpdateCustomer from './UpdateCustomer';
import {Link} from 'react-router-dom';

const SingleCustomer = ({customers, match: {params: {id}} , history}) =>{

    const custImgs = ['https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/197133964/original/0ed5bc108ca2aeb379621e0e5a1298f1f1d6cb72/draw-minimalist-vector-graphic-portrait-from-your-photo.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/166153502/original/69fb905e6f3d443029d7aa9395b147926625953c/make-custom-faceless-portrait-illustration.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/106190921/original/cd138ef956ddbda78b593797ed53693b7974a757/create-a-minimalist-portrait-of-you-or-someone-else.png', 'https://i.pinimg.com/originals/e9/dd/04/e9dd0421638a9ec3f0c988261e0d4d35.jpg', 'https://i.pinimg.com/originals/e8/14/57/e81457044de55fb122521bda64fde7ad.png', 'https://i.pinimg.com/originals/86/82/7d/86827d0fd726f5ba429443d0f7d5e484.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/011519959f35c5b2ba2aceaebdf1e859-1598519291/Artboard%201/draw-minimalist-faceless-vector-portrait-for-you.png', 'https://static.vecteezy.com/system/resources/previews/001/234/725/original/side-portrait-of-a-black-man-vector.jpg', 'https://pbs.twimg.com/media/Edrm4bFXoAAkAvB.png', 'https://pbs.twimg.com/media/Edrm4bFXoAAkAvB.png', 'https://pbs.twimg.com/media/EeFQAw4XsAA_ksn.png', 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/146877236/original/4a0bad3c34aace973d55884d135c8fe22f2cabe4/create-a-custom-minimalist-portrait.jpg', 'https://i.pinimg.com/originals/ab/74/72/ab7472abd6dc0d7b5c7d08f87f8b5e93.png', 'https://i.pinimg.com/736x/d5/fa/09/d5fa09d3db222b449450d24c8657b30b.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTyyJUbDoc2lWhIMZQ9EErCFvk4ZXyX6UDiKzvPYSmNI_yC9ooBArxe0612J9H_u3n6ZE&usqp=CAU', 'https://i.pinimg.com/originals/2e/64/f7/2e64f711a695e6cb9e19ada82e42c68f.jpg', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/63a94057-bf48-4e07-83ed-a52e59b3c7ab/d8yre9p-25c2f893-7bdf-4d22-ad40-c5da320a5ff1.jpg/v1/fill/w_1024,h_1024,q_75,strp/my_minimalist_portrait_by_rogermata77_d8yre9p-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzYzYTk0MDU3LWJmNDgtNGUwNy04M2VkLWE1MmU1OWIzYzdhYlwvZDh5cmU5cC0yNWMyZjg5My03YmRmLTRkMjItYWQ0MC1jNWRhMzIwYTVmZjEuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.dspAzpVKVOFMkO1sSf8cl-LUzqu8T-JHRuOWYqOzZ98', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlhpPodekhaRM5kn4gbZ2HyA-NyXIqZKOaqIEvn1Xg-eJQjk9hV6XNzvdJgwfw4X4gVA&usqp=CAU']

    if(customers.length === 0){
        return (<div>No Customer found here :(</div>)
    }
    const customer = customers.find(customer => customer.id === id*1)
    if(customer === undefined){
        return(<div>No Customer found here :(</div>)
    }
    return(
        <div>
            <Link className="back" to='/Admin/Customers'>Back to Manage All Customers</Link>
                <div className="single-Cust-Title" >Customer Details</div>
            <div className="singleCustomer">
                <div className="singleCustDetails">
                    <img className='adminSingleCust-img' src={Math.round(Math.random()*(custImgs.length)-1)>0 ? custImgs[Math.round(Math.random()*(custImgs.length)-1)] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlhpPodekhaRM5kn4gbZ2HyA-NyXIqZKOaqIEvn1Xg-eJQjk9hV6XNzvdJgwfw4X4gVA&usqp=CAU'}/>
                    <br/>
                    <div>{customer.firstName}</div> 
                    <div>{customer.lastName}</div> 
                    <div>{customer.address}</div> 
                </div>
                <UpdateCustomer customer={customer} history={history}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(SingleCustomer)