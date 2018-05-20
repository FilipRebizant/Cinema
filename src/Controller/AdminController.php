<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Form\HallType;
use App\Repository\HallRepository;
use App\Repository\FOSUserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class AdminController extends Controller
{
    /**
     * @Route("/adminsite", name="admin_index", methods="GET")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }
    
    /**
     * @Route("/users", name="admin_users", methods="GET")
     */
    public function users(FOSUserRepository $FOSUserRepository): Response
    {
//        $userManager = $this->get('fos_user.user_manager');
//        $userManager->getDoctrine()->getManager()->
//        dump();
//        die;
        return $this->render('admin/users.html.twig',[
            'users' => $FOSUserRepository->findAll()
        ]);
    }
    
}
